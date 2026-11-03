# API tests with Postman

> Svensk version: [README.sv.md](README.sv.md)

Postman collection for the Ärenden API in `backend/`. The tests follow the requirements in `kundportal-sdd/specs/arenden.md` (R#, A#).

## Files

- `kundportal.postman_collection.json` – all requests with test scripts.
- `kundportal.postman_environment.json` – environment with `baseUrl = http://127.0.0.1:8000`.

## Run in Postman

1. Start the backend (see the project README).
2. In Postman: **Import** → select both files.
3. Select the environment **Kundportal local** in the top right corner.
4. Right-click the collection → **Run collection**.

Run the **Ärenden** folder in order: "A1 Create valid case" saves `arendeId`, which "A7 Get case by id" uses.

## Run from the terminal (Newman)

```bash
npx newman run docs/api/kundportal.postman_collection.json \
  -e docs/api/kundportal.postman_environment.json \
  --folder Health --folder Ärenden
```

The **Proposed (not in backend yet)** folder describes endpoints that the frontend already uses through mocks (`frontend/src/mocks/handlers.ts`). They fail until the backend builds them.

## OpenAPI

FastAPI also publishes an OpenAPI spec at <http://127.0.0.1:8000/openapi.json>. You can import it directly in Postman (**Import → Link**) as a complement.
