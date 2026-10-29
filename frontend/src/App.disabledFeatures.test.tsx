import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

// Real backend has no PUT /arenden/{id} yet, so `npm run dev` runs with the flag off.
describe("App with editing off (no backend API yet)", () => {
  beforeEach(() => vi.stubEnv("VITE_ENABLE_EDIT", "false"));

  it("row edit is disabled and no delete option is shown", async () => {
    render(<App />);
    const edit = await screen.findByRole("button", { name: "Redigera Kan inte logga in" });

    expect(edit).toBeDisabled();
    expect(screen.queryByRole("button", { name: /ta bort/i })).not.toBeInTheDocument();
    expect(edit).toHaveAttribute("title", "Inte tillgängligt än – API saknas");
  });

  it("panel shows Redigera disabled with a note; status still works", async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(await screen.findByText("Kan inte logga in"));
    const side = await screen.findByRole("complementary", { name: "Ärendedetaljer" });

    expect(await within(side).findByRole("button", { name: "Redigera" })).toBeDisabled();
    expect(within(side).queryByRole("button", { name: /ta bort/i })).not.toBeInTheDocument();
    expect(
      within(side).getByText("Redigering är inte tillgänglig än (API saknas)."),
    ).toBeInTheDocument();
    expect(within(side).getByLabelText("Ändra status")).toBeEnabled();
  });
});
