import { describe, expect, it } from "vitest";
import { seedArenden } from "../mocks/data";
import { filterArenden, sortNewestFirst } from "./filterArenden";

const arenden = seedArenden();
const titles = (q: Parameters<typeof filterArenden>[1]) =>
  filterArenden(arenden, q).map((a) => a.rubrik);

describe("filterArenden (R11)", () => {
  it("A11: finds cases by text", () => {
    expect(titles({ q: "faktura" })).toEqual(["Faktura saknas", "Fel på faktura"]);
  });

  it("A12: ignores upper/lower case", () => {
    expect(titles({ q: "FAKTURA" })).toEqual(titles({ q: "faktura" }));
  });

  it("A13: filters by status", () => {
    expect(titles({ status: "Nytt" })).toEqual(["Faktura saknas"]);
  });

  it("A14: combines search and filter with AND", () => {
    expect(titles({ q: "faktura", prioritet: "Låg" })).toEqual(["Fel på faktura"]);
  });

  it("filters by kategori", () => {
    expect(titles({ kategori: "Teknik" })).toEqual(["Kan inte logga in"]);
  });

  it("A15: returns empty list when nothing matches", () => {
    expect(titles({ q: "xyz123" })).toEqual([]);
  });

  it("A16: spaces-only search shows all", () => {
    expect(titles({ q: "   " })).toHaveLength(3);
  });

  it("trims search text", () => {
    expect(titles({ q: "  faktura  " })).toEqual(titles({ q: "faktura" }));
  });

  it("matches Swedish characters case-insensitively", () => {
    expect(titles({ q: "FEL PÅ" })).toEqual(["Fel på faktura"]);
  });

  it("treats special characters as plain text", () => {
    for (const q of ["%", "_", "'", '"', "<script>", ".*"]) {
      expect(titles({ q })).toEqual([]);
    }
  });

  it("searches description too (Q7 proposal)", () => {
    expect(titles({ q: "felmeddelande" })).toEqual(["Kan inte logga in"]);
  });

  it("R11.8: does not change the input", () => {
    const copy = structuredClone(arenden);
    filterArenden(arenden, { q: "faktura", status: "Nytt" });
    expect(arenden).toEqual(copy);
  });
});

describe("sortNewestFirst (R6)", () => {
  it("A12: the most recently created case comes first and the oldest last", () => {
    const [c1, c2, c3] = seedArenden();
    // Neither the ids nor the input order follow the created time, so only skapad decides.
    const unordered = [
      { ...c1, skapad: "2026-10-21T09:30:00Z" },
      { ...c2, skapad: "2026-10-22T14:15:00Z" },
      { ...c3, skapad: "2026-10-20T08:00:00Z" },
    ];
    expect(sortNewestFirst(unordered).map((a) => a.id)).toEqual([2, 1, 3]);
  });

  it("R6: with the same created time, the highest id comes first", () => {
    const [c1, c2] = seedArenden();
    const sameTime = [c1, { ...c2, skapad: c1.skapad }];
    expect(sortNewestFirst(sameTime).map((a) => a.id)).toEqual([2, 1]);
  });
});
