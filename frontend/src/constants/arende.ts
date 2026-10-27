import type { ArendeStatus } from "../types/arende";

// Matches ArendeStatus in backend/app/schemas/arende.py.
export const STATUSAR: readonly ArendeStatus[] = ["Nytt", "Pågående", "Väntar på kund", "Avslutat"];

// Provisional: proposals from open questions Q1/Q2. The team has not decided yet,
// and the backend accepts any string until TILLATNA_KATEGORIER/PRIORITETER are set.
export const KATEGORIER: readonly string[] = ["Fakturering", "Teknik", "Leverans", "Övrigt"];
export const PRIORITETER: readonly string[] = ["Låg", "Medel", "Hög"];
