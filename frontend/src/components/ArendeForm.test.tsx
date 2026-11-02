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
