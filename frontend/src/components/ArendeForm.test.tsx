import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { API_BASE_URL } from "../api/arendenApi";
import { db } from "../mocks/handlers";
import { server } from "../mocks/node";
import { ArendeForm } from "./ArendeForm";

async function fill(values: Partial<Record<"rubrik" | "beskrivning", string>> = {}) {
  const user = userEvent.setup();
  const rubrik = values.rubrik ?? "Leverans försenad";
  const beskrivning = values.beskrivning ?? "Paketet har inte kommit.";
  if (rubrik) await user.type(screen.getByLabelText("Rubrik"), rubrik);
  if (beskrivning) await user.type(screen.getByLabelText("Beskrivning"), beskrivning);
  await user.selectOptions(screen.getByLabelText("Kategori"), "Leverans");
  await user.selectOptions(screen.getByLabelText("Prioritet"), "Hög");
  return user;
}

function renderCreate() {
  const onSaved = vi.fn();
  const onCancel = vi.fn();
  render(<ArendeForm onSaved={onSaved} onCancel={onCancel} />);
  return { onSaved, onCancel };
}

describe("ArendeForm – create", () => {
  it("A1: creates a case with status Nytt", async () => {
    const { onSaved } = renderCreate();
    expect(screen.getByRole("heading", { name: "Nytt ärende" })).toBeInTheDocument();
    const user = await fill();
    await user.click(screen.getByRole("button", { name: "Skapa ärende" }));

    expect(onSaved).toHaveBeenCalledWith(
      expect.objectContaining({
        rubrik: "Leverans försenad",
        status: "Nytt",
        kategori: "Leverans",
      }),
    );
    expect(db.arenden).toHaveLength(4);
  });

  it("A2: rejects missing title, nothing saved", async () => {
    const { onSaved } = renderCreate();
    const user = await fill({ rubrik: "" });
    await user.click(screen.getByRole("button", { name: "Skapa ärende" }));

    expect(screen.getByText("Rubrik måste fyllas i.")).toBeInTheDocument();
    expect(screen.getByLabelText("Rubrik")).toHaveAttribute("aria-invalid", "true");
    expect(onSaved).not.toHaveBeenCalled();
    expect(db.arenden).toHaveLength(3);
  });

  it("moves focus to the first invalid field on submit", async () => {
    renderCreate();
    await userEvent.setup().click(screen.getByRole("button", { name: "Skapa ärende" }));
    expect(screen.getByLabelText("Rubrik")).toHaveFocus();
  });

  it("A3: title with only spaces counts as empty", async () => {
    renderCreate();
    const user = await fill({ rubrik: "    " });
    await user.click(screen.getByRole("button", { name: "Skapa ärende" }));

    expect(screen.getByText("Rubrik måste fyllas i.")).toBeInTheDocument();
    expect(db.arenden).toHaveLength(3);
  });

  it("R2: shows a message for every missing field", async () => {
    renderCreate();
    await userEvent.setup().click(screen.getByRole("button", { name: "Skapa ärende" }));

    for (const text of [
      "Rubrik måste fyllas i.",
      "Beskrivning måste fyllas i.",
      "Välj en kategori.",
      "Välj en prioritet.",
    ]) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
  });

  it("A4: shows backend field error and keeps input", async () => {
    server.use(
      http.post(`${API_BASE_URL}/arenden`, () =>
        HttpResponse.json(
          { detail: [{ loc: ["body", "kategori"], msg: "Value error, Ogiltig kategori" }] },
          { status: 422 },
        ),
      ),
    );
    const { onSaved } = renderCreate();
    const user = await fill();
    await user.click(screen.getByRole("button", { name: "Skapa ärende" }));

    expect(await screen.findByText("Ogiltig kategori")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Kontrollera fälten och försök igen.");
    expect(screen.getByLabelText("Rubrik")).toHaveValue("Leverans försenad");
    expect(onSaved).not.toHaveBeenCalled();
  });

  it("disables submit while saving", async () => {
    let release: () => void = () => {};
    server.use(
      http.post(`${API_BASE_URL}/arenden`, async () => {
        await new Promise<void>((resolve) => (release = resolve));
        return HttpResponse.json({}, { status: 201 });
      }),
    );
    renderCreate();
    const user = await fill();
    await user.click(screen.getByRole("button", { name: "Skapa ärende" }));

    expect(await screen.findByRole("button", { name: "Sparar…" })).toBeDisabled();
    release();
    expect(await screen.findByRole("button", { name: "Skapa ärende" })).toBeEnabled();
  });

  it("calls onCancel", async () => {
    const { onCancel } = renderCreate();
    await userEvent.setup().click(screen.getByRole("button", { name: "Avbryt" }));
    expect(onCancel).toHaveBeenCalled();
  });
});

describe("ArendeForm – edit (proposed, out of v1.0 scope)", () => {
  it("prefills fields and saves changes", async () => {
    const onSaved = vi.fn();
    render(<ArendeForm arende={db.arenden[0]} onSaved={onSaved} onCancel={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "Redigera ärende" })).toBeInTheDocument();
    expect(screen.getByLabelText("Rubrik")).toHaveValue("Faktura saknas");
    expect(screen.getByLabelText("Kategori")).toHaveValue("Fakturering");

    const user = userEvent.setup();
    await user.clear(screen.getByLabelText("Rubrik"));
    await user.type(screen.getByLabelText("Rubrik"), "Faktura saknas igen");
    await user.click(screen.getByRole("button", { name: "Spara ändringar" }));

    expect(onSaved).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, rubrik: "Faktura saknas igen", status: "Nytt" }),
    );
    expect(db.arenden[0].rubrik).toBe("Faktura saknas igen");
  });

  it("keeps an existing category that is not in the provisional list", async () => {
    render(
      <ArendeForm
        arende={{ ...db.arenden[0], kategori: "Support" }}
        onSaved={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByLabelText("Kategori")).toHaveValue("Support");
  });

  it("Spara ändringar updates in place, no new case", async () => {
    render(<ArendeForm arende={db.arenden[1]} onSaved={vi.fn()} onCancel={vi.fn()} />);
    await userEvent.setup().click(screen.getByRole("button", { name: "Spara ändringar" }));
    await vi.waitFor(() => expect(db.arenden).toHaveLength(3));
  });

  it("Spara som nytt ärende creates a copy with status Nytt and keeps the original", async () => {
    const onSaved = vi.fn();
    render(<ArendeForm arende={db.arenden[2]} onSaved={onSaved} onCancel={vi.fn()} />);
    const user = userEvent.setup();
    await user.clear(screen.getByLabelText("Rubrik"));
    await user.type(screen.getByLabelText("Rubrik"), "Fel på faktura – ny");
    await user.click(screen.getByRole("button", { name: "Spara som nytt ärende" }));

    await vi.waitFor(() => expect(onSaved).toHaveBeenCalled());
    expect(onSaved.mock.calls[0][0]).toMatchObject({
      id: 4,
      rubrik: "Fel på faktura – ny",
      status: "Nytt",
    });
    expect(db.arenden).toHaveLength(4);
    expect(db.arenden[2]).toMatchObject({ id: 3, rubrik: "Fel på faktura", status: "Avslutat" });
  });

  it("Spara som nytt ärende validates like create", async () => {
    const onSaved = vi.fn();
    render(<ArendeForm arende={db.arenden[0]} onSaved={onSaved} onCancel={vi.fn()} />);
    const user = userEvent.setup();
    await user.clear(screen.getByLabelText("Rubrik"));
    await user.click(screen.getByRole("button", { name: "Spara som nytt ärende" }));

    expect(screen.getByText("Rubrik måste fyllas i.")).toBeInTheDocument();
    expect(onSaved).not.toHaveBeenCalled();
    expect(db.arenden).toHaveLength(3);
  });
});
