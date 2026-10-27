import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import App from "./App";
import { API_BASE_URL } from "./api/arendenApi";
import { db } from "./mocks/handlers";
import { server } from "./mocks/node";

async function rowTitles() {
  const table = await screen.findByRole("table");
  return within(table)
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[0].textContent);
}

const panel = () => screen.queryByRole("complementary", { name: /ärende/i });

describe("App", () => {
  it("default page: Alla ärenden list, no side panel", async () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Alla ärenden" })).toBeInTheDocument();
    expect(await rowTitles()).toEqual(["Fel på faktura", "Kan inte logga in", "Faktura saknas"]);
    expect(panel()).not.toBeInTheDocument();
  });

  it("A6: list columns are title, status, priority and created", async () => {
    render(<App />);
    await rowTitles();
    const headers = screen.getAllByRole("columnheader").map((h) => h.textContent);
    expect(headers).toEqual(["Rubrik", "Status", "Prioritet", "Skapad", "Åtgärder"]);
  });

  it("shows empty state when no cases exist", async () => {
    db.reset([]);
    render(<App />);
    expect(await screen.findByText("Inga ärenden ännu")).toBeInTheDocument();
  });

  it("shows error with retry when the API is down", async () => {
    server.use(http.get(`${API_BASE_URL}/arenden`, () => HttpResponse.error()));
    render(<App />);
    expect(await screen.findByRole("alert")).toHaveTextContent("Kunde inte nå servern");
    server.resetHandlers();
    await userEvent.setup().click(screen.getByRole("button", { name: "Försök igen" }));
    expect(await rowTitles()).toHaveLength(3);
  });

  it("A7: clicking a row opens details in the side panel, list stays visible", async () => {
    render(<App />);
    const user = userEvent.setup();
    await rowTitles();
    await user.click(screen.getByText("Kan inte logga in"));

    const side = await screen.findByRole("complementary", { name: "Ärendedetaljer" });
    expect(await within(side).findByText("Inloggningen ger felmeddelande.")).toBeInTheDocument();
    expect(await rowTitles()).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Kan inte logga in" })).toHaveAttribute(
      "aria-current",
      "true",
    );

    await user.click(within(side).getByRole("button", { name: "Stäng" }));
    expect(panel()).not.toBeInTheDocument();
  });

  it("A1: Nytt ärende opens the form in the panel; new case is first and shown", async () => {
    render(<App />);
    const user = userEvent.setup();
    await rowTitles();
    await user.click(screen.getByRole("button", { name: "Nytt ärende" }));

    const side = screen.getByRole("complementary", { name: "Nytt ärende" });
    await user.type(within(side).getByLabelText("Rubrik"), "Ny leverans");
    await user.type(within(side).getByLabelText("Beskrivning"), "Text");
    await user.selectOptions(within(side).getByLabelText("Kategori"), "Leverans");
    await user.selectOptions(within(side).getByLabelText("Prioritet"), "Låg");
    await user.click(within(side).getByRole("button", { name: "Skapa ärende" }));

    expect((await rowTitles())[0]).toBe("Ny leverans");
    const detail = await screen.findByRole("complementary", { name: "Ärendedetaljer" });
    expect(await within(detail).findByRole("heading", { name: "Ny leverans" })).toBeInTheDocument();
  });

  it("edit in the panel updates list and details", async () => {
    render(<App />);
    const user = userEvent.setup();
    await rowTitles();
    await user.click(screen.getByText("Faktura saknas"));
    await user.click(await screen.findByRole("button", { name: "Redigera" }));

    const side = screen.getByRole("complementary", { name: "Redigera ärende" });
    await user.clear(within(side).getByLabelText("Rubrik"));
    await user.type(within(side).getByLabelText("Rubrik"), "Faktura saknas (okt)");
    await user.click(within(side).getByRole("button", { name: "Spara ändringar" }));

    const detail = await screen.findByRole("complementary", { name: "Ärendedetaljer" });
    expect(
      await within(detail).findByRole("heading", { name: "Faktura saknas (okt)" }),
    ).toBeInTheDocument();
    expect(await rowTitles()).toContain("Faktura saknas (okt)");
  });

  it("delete in the panel removes the row and closes the panel", async () => {
    render(<App />);
    const user = userEvent.setup();
    await rowTitles();
    await user.click(screen.getByText("Kan inte logga in"));
    await user.click(await screen.findByRole("button", { name: "Ta bort" }));
    await user.click(screen.getByRole("button", { name: "Ja, ta bort" }));

    await screen.findByText("Ärendet togs bort.");
    expect(await rowTitles()).toEqual(["Fel på faktura", "Faktura saknas"]);
    expect(panel()).not.toBeInTheDocument();
  });

  it("A14: search + filter combine; A15: no hits message; A16: spaces show all", async () => {
    render(<App />);
    const user = userEvent.setup();
    await rowTitles();

    await user.type(screen.getByLabelText("Sök"), "faktura{Enter}");
    expect(await rowTitles()).toEqual(["Fel på faktura", "Faktura saknas"]);

    await user.selectOptions(screen.getByLabelText("Filtrera prioritet"), "Låg");
    expect(await rowTitles()).toEqual(["Fel på faktura"]);

    await user.clear(screen.getByLabelText("Sök"));
    await user.type(screen.getByLabelText("Sök"), "xyz123{Enter}");
    expect(await screen.findByText("Inga ärenden matchar")).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Filtrera prioritet"), "");
    await user.clear(screen.getByLabelText("Sök"));
    await user.type(screen.getByLabelText("Sök"), "   ");
    await user.click(screen.getByRole("button", { name: "Sök" }));
    expect(await rowTitles()).toHaveLength(3);
  });

  it("renders <script> search text as plain text, no crash", async () => {
    render(<App />);
    const user = userEvent.setup();
    await rowTitles();
    await user.type(screen.getByLabelText("Sök"), "<script>alert(1)</script>{Enter}");
    expect(await screen.findByText("Inga ärenden matchar")).toBeInTheDocument();
  });

  it("A8: status change in the panel is reflected by the list filter", async () => {
    render(<App />);
    const user = userEvent.setup();
    await rowTitles();
    await user.click(screen.getByText("Faktura saknas"));
    await user.selectOptions(await screen.findByLabelText("Ändra status"), "Avslutat");
    await screen.findByText("Avslutat", { selector: "aside .badge" });

    await user.selectOptions(screen.getByLabelText("Filtrera status"), "Avslutat");
    expect(await rowTitles()).toEqual(["Fel på faktura", "Faktura saknas"]);
  });

  it("edit icon in a row opens the edit form in the panel", async () => {
    render(<App />);
    const user = userEvent.setup();
    await rowTitles();
    await user.click(screen.getByRole("button", { name: "Redigera Kan inte logga in" }));

    const side = screen.getByRole("complementary", { name: "Redigera ärende" });
    expect(within(side).getByLabelText("Rubrik")).toHaveValue("Kan inte logga in");
  });

  it("delete icon in a row asks for confirmation before deleting", async () => {
    render(<App />);
    const user = userEvent.setup();
    await rowTitles();
    await user.click(screen.getByRole("button", { name: "Ta bort Kan inte logga in" }));

    const side = await screen.findByRole("complementary", { name: "Ärendedetaljer" });
    expect(await within(side).findByText(/Det går inte att ångra/)).toBeInTheDocument();
    expect(db.arenden).toHaveLength(3);

    await user.click(within(side).getByRole("button", { name: "Ja, ta bort" }));
    await screen.findByText("Ärendet togs bort.");
    expect(await rowTitles()).toEqual(["Fel på faktura", "Faktura saknas"]);
  });

  it("row icons do not trigger the row click", async () => {
    render(<App />);
    const user = userEvent.setup();
    await rowTitles();
    await user.click(screen.getByRole("button", { name: "Redigera Faktura saknas" }));
    expect(screen.queryByRole("complementary", { name: "Ärendedetaljer" })).not.toBeInTheDocument();
  });
});
