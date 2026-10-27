import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

// Real backend has no PUT/DELETE /arenden/{id} yet, so `npm run dev` runs with the flag off.
describe("App with edit/delete off (no backend API yet)", () => {
  beforeEach(() => vi.stubEnv("VITE_ENABLE_EDIT_DELETE", "false"));

  it("row edit and delete icons are disabled and explain why", async () => {
    render(<App />);
    const edit = await screen.findByRole("button", { name: "Redigera Kan inte logga in" });
    const remove = screen.getByRole("button", { name: "Ta bort Kan inte logga in" });

    expect(edit).toBeDisabled();
    expect(remove).toBeDisabled();
    expect(edit).toHaveAttribute("title", "Inte tillgängligt än – API saknas");
  });

  it("panel shows Redigera and Ta bort disabled with a note; status still works", async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(await screen.findByText("Kan inte logga in"));
    const side = await screen.findByRole("complementary", { name: "Ärendedetaljer" });

    expect(await within(side).findByRole("button", { name: "Redigera" })).toBeDisabled();
    expect(within(side).getByRole("button", { name: "Ta bort" })).toBeDisabled();
    expect(
      within(side).getByText("Redigera och ta bort är inte tillgängliga än (API saknas)."),
    ).toBeInTheDocument();
    expect(within(side).getByLabelText("Ändra status")).toBeEnabled();
  });
});
