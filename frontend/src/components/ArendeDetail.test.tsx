import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { API_BASE_URL } from "../api/arendenApi";
import { db } from "../mocks/handlers";
import { server } from "../mocks/node";
import { ArendeDetail } from "./ArendeDetail";

function renderDetail(id = 1) {
  const props = { onClose: vi.fn(), onChanged: vi.fn(), onEdit: vi.fn(), onDeleted: vi.fn() };
  render(<ArendeDetail id={id} {...props} />);
  return props;
}

describe("ArendeDetail", () => {
  it("A7: shows all fields of the case", async () => {
    renderDetail();

    expect(await screen.findByRole("heading", { name: "Faktura saknas" })).toBeInTheDocument();
    expect(screen.getByText("Kunden har inte fått sin faktura för oktober.")).toBeInTheDocument();
    expect(screen.getByText("Fakturering")).toBeInTheDocument();
    expect(screen.getByText("Hög")).toBeInTheDocument();
    expect(screen.getByText("Nytt", { selector: ".badge" })).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("A10: shows a clear message when the case does not exist", async () => {
    renderDetail(999);
    expect(await screen.findByRole("alert")).toHaveTextContent("Ärendet hittades inte");
  });

  it("A8: changes status, other fields unchanged", async () => {
    const { onChanged } = renderDetail();
    const select = await screen.findByLabelText("Ändra status");
    await userEvent.setup().selectOptions(select, "Pågående");

    expect(await screen.findByText("Pågående", { selector: ".badge" })).toBeInTheDocument();
    expect(onChanged).toHaveBeenCalledWith(expect.objectContaining({ id: 1, status: "Pågående" }));
    expect(db.arenden[0]).toMatchObject({ rubrik: "Faktura saknas", prioritet: "Hög" });
  });

  it("A9: rejected status keeps the old status and shows a message", async () => {
    server.use(
      http.post(`${API_BASE_URL}/arenden/:id/status`, () =>
        HttpResponse.json(
          { detail: [{ loc: ["body", "status"], msg: "Ogiltig status" }] },
          { status: 422 },
        ),
      ),
    );
    const { onChanged } = renderDetail();
    await userEvent.setup().selectOptions(await screen.findByLabelText("Ändra status"), "Avslutat");

    expect(await screen.findByRole("alert")).toHaveTextContent("Ogiltig status");
    expect(screen.getByLabelText("Ändra status")).toHaveValue("Nytt");
    expect(onChanged).not.toHaveBeenCalled();
  });

  it("ignores a status response for a case that is no longer shown", async () => {
    server.use(
      http.post(`${API_BASE_URL}/arenden/:id/status`, async ({ params }) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const arende = db.arenden.find((a) => a.id === Number(params.id));
        return HttpResponse.json({ ...arende, status: "Avslutat" });
      }),
    );
    const props = { onClose: vi.fn(), onChanged: vi.fn(), onEdit: vi.fn(), onDeleted: vi.fn() };
    const { rerender } = render(<ArendeDetail id={1} {...props} />);
    await userEvent.setup().selectOptions(await screen.findByLabelText("Ändra status"), "Avslutat");
    rerender(<ArendeDetail id={2} {...props} />);
    expect(await screen.findByRole("heading", { name: "Kan inte logga in" })).toBeInTheDocument();

    await waitFor(() => expect(props.onChanged).toHaveBeenCalled());
    expect(screen.getByRole("heading", { name: "Kan inte logga in" })).toBeInTheDocument();
  });

  it("calls onClose", async () => {
    const { onClose } = renderDetail();
    await userEvent.setup().click(screen.getByRole("button", { name: "Stäng" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("Redigera passes the loaded case to onEdit", async () => {
    const { onEdit } = renderDetail();
    await userEvent.setup().click(await screen.findByRole("button", { name: "Redigera" }));
    expect(onEdit).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, rubrik: "Faktura saknas" }),
    );
  });

  it("Ta bort asks for confirmation; Avbryt keeps the case", async () => {
    const { onDeleted } = renderDetail();
    const user = userEvent.setup();
    await user.click(await screen.findByRole("button", { name: "Ta bort" }));

    expect(screen.getByText(/Det går inte att ångra/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Avbryt" }));
    expect(onDeleted).not.toHaveBeenCalled();
    expect(db.arenden).toHaveLength(3);
  });

  it("confirmed delete removes the case", async () => {
    const { onDeleted } = renderDetail();
    const user = userEvent.setup();
    await user.click(await screen.findByRole("button", { name: "Ta bort" }));
    await user.click(screen.getByRole("button", { name: "Ja, ta bort" }));

    await vi.waitFor(() => expect(onDeleted).toHaveBeenCalledWith(1));
    expect(db.arenden.map((a) => a.id)).toEqual([2, 3]);
  });

  it("shows a message when delete fails", async () => {
    server.use(http.delete(`${API_BASE_URL}/arenden/:id`, () => HttpResponse.error()));
    const { onDeleted } = renderDetail();
    const user = userEvent.setup();
    await user.click(await screen.findByRole("button", { name: "Ta bort" }));
    await user.click(screen.getByRole("button", { name: "Ja, ta bort" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Kunde inte nå servern");
    expect(onDeleted).not.toHaveBeenCalled();
  });
});
