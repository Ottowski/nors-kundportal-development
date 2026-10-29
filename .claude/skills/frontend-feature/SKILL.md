---
name: frontend-feature
description: "Adds or changes a frontend feature in frontend/ for one or more spec requirements (R#/A#), test-first, against the real API or MSW mocks. Use when a spec requirement needs UI, a backend endpoint was added or changed, or a frontend acceptance test fails."
allowed_tools: [Read, Write, Edit, Glob, Grep, Bash]
---

## When to Use

- A requirement in `../kundportal-sdd/specs/*.md` needs UI work.
- Backend adds or changes an endpoint in `backend/app/routers/`.
- An open question (Q#) closes and changes values or behaviour.

## Order of work

1. **Read the source.** Spec section (R#, A#), `backend/app/schemas/arende.py`, the router. Never guess field names.
2. **Types.** Update `src/types/arende.ts` to match the backend schema exactly.
3. **Mock.** Update `src/mocks/handlers.ts` so it behaves like the backend: same status codes, same `detail` shape. For an endpoint the backend does not have yet, add it here and in the Postman "Proposed" folder.
4. **API client.** Add the call in `src/api/arendenApi.ts`. All `fetch` goes through `request()`.
5. **Test first.** Write the failing test. Name it after the criterion: `it("A9: rejected status keeps the old status", …)`.
6. **Component.** Make the test pass. Keep state local; lift only to `App.tsx` when the list must change.
7. **Postman.** Add or update the request in `docs/api/kundportal.postman_collection.json` with `pm.test` checks.
8. **Check.** `cd frontend && npm run check`. All steps must pass.

> See `docs/architecture-flow.md` for the data flow and error flow.

## Key rules

- UI text is Swedish. Code identifiers follow the backend (`rubrik`, `prioritet`).
- Every async view has loading, empty, error and success states.
- Show backend messages through `ApiError`. Never show raw fetch or HTTP text.
- Update local state from the API response (create, status change). Do not refetch the list.
- Provisional values (Q1/Q2) live only in `src/constants/arende.ts`.
- Tests use Testing Library queries by role/label, not CSS classes, except for `.badge` where text repeats.

## Good vs bad

```ts
// Bad: raw error, refetch, magic strings
catch (e) { setError(String(e)); load(); }
if (arende.status === "Avslutad") { … }   // typo, compiler does not see it

// Good: normalized error, local update, typed union
catch (e) { setError(e instanceof ApiError ? e.message : UNKNOWN_ERROR_MESSAGE); }
onChanged(await updateStatus(arende.id, "Avslutat"));   // ArendeStatus union
```

## Gotchas

- **MSW `onUnhandledRequest: "error"`.** A test that calls an endpoint with no handler fails loudly. Add the handler, do not relax the option.
- **Mock state leaks between tests unless reset.** `src/test/setup.ts` calls `db.reset()` after each test. If you add new mock state, reset it there too.
- **Duplicate labels break `getByLabelText`.** The form and the filter bar both had "Kategori". Give each control a unique accessible name ("Filtrera kategori").
- **Pydantic prefixes validator messages with `Value error, `.** `toApiError` strips it. Keep that when you change error parsing.
- **FastAPI 422 `loc` ends with the field name.** Use the last element, not index 1; nested bodies make the path longer.
- **Backend ignores unknown query params.** `GET /arenden?status=X` returns all cases today, so a "passing" filter request proves nothing until the backend implements it.
- **`--mode mock` only.** The MSW worker must not start in a normal build. Keep the dynamic import behind `import.meta.env.MODE === "mock"`.
