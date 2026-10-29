// Editing needs PUT /arenden/{id}, which the backend does not have yet (and ADR-002 keeps it
// out of v1.0). On in `npm run dev:mock`, off against the real backend unless VITE_ENABLE_EDIT=true.
// Read at call time so tests can stub the env.
export function isEditEnabled(): boolean {
  const flag = import.meta.env.VITE_ENABLE_EDIT;
  return flag !== undefined ? flag === "true" : import.meta.env.MODE === "mock";
}

export const EDIT_UNAVAILABLE = "Inte tillgängligt än – API saknas";
export const EDIT_UNAVAILABLE_NOTE = "Redigering är inte tillgänglig än (API saknas).";
