import type { Arende, ArendeFilter } from "../types/arende";

// Search runs on the loaded list because the backend has no search endpoint yet (Q9 open).
export function filterArenden(arenden: readonly Arende[], filter: ArendeFilter): Arende[] {
  const query = filter.q?.trim().toLocaleLowerCase("sv-SE") ?? "";

  return arenden.filter((arende) => {
    if (filter.status && arende.status !== filter.status) {
      return false;
    }
    if (filter.kategori && arende.kategori !== filter.kategori) {
      return false;
    }
    if (filter.prioritet && arende.prioritet !== filter.prioritet) {
      return false;
    }
    if (!query) {
      return true;
    }
    // Title + description, per Q7 proposal.
    return `${arende.rubrik}\n${arende.beskrivning}`.toLocaleLowerCase("sv-SE").includes(query);
  });
}

export function sortNewestFirst(arenden: readonly Arende[]): Arende[] {
  return [...arenden].sort((a, b) => Date.parse(b.skapad) - Date.parse(a.skapad) || b.id - a.id);
}
