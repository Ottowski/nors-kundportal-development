import type { ArendeStatus } from "../types/arende";

// Matches ArendeStatus in backend/app/schemas/arende.py.
export const STATUSAR: readonly ArendeStatus[] = ["Nytt", "Pågående", "Väntar på kund", "Avslutat"];

// Allowed values from docs/specs/kravspec.md (Q1, Q2), in the spec's order. The backend
// accepts any string until TILLATNA_KATEGORIER/PRIORITETER are set (backend agentuppdrag, step 3).
export const KATEGORIER: readonly string[] = ["Fakturering", "Teknik", "Leverans", "Övrigt"];
export const PRIORITETER: readonly string[] = ["Låg", "Medel", "Hög"];
