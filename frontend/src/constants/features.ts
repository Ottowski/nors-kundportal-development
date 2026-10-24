// Edit and delete need PUT/DELETE /arenden/{id}, which the backend does not have yet
// (and ADR-002 keeps them out of v1.0). On in `npm run dev:mock`, off against the real backend
// unless VITE_ENABLE_EDIT_DELETE=true. Read at call time so tests can stub the env.
export function isEditDeleteEnabled(): boolean {
  const flag = import.meta.env.VITE_ENABLE_EDIT_DELETE;
  return flag !== undefined ? flag === "true" : import.meta.env.MODE === "mock";
}

export const EDIT_DELETE_UNAVAILABLE = "Inte tillgängligt än – API saknas";
export const EDIT_DELETE_UNAVAILABLE_NOTE =
  "Redigera och ta bort är inte tillgängliga än (API saknas).";
