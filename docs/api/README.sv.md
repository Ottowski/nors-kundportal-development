# API-test med Postman

> English version: [README.md](README.md)

Postman-samling för Ärenden-API:t i `backend/`. Testerna följer kraven i `kundportal-sdd/specs/arenden.md` (R#, A#).

## Filer

- `kundportal.postman_collection.json` – alla anrop med testskript.
- `kundportal.postman_environment.json` – miljö med `baseUrl = http://127.0.0.1:8000`.

## Köra i Postman

1. Starta backend (se projektets README).
2. I Postman: **Import** → välj båda filerna.
3. Välj miljön **Kundportal local** uppe till höger.
4. Högerklicka på samlingen → **Run collection**.

Kör mappen **Ärenden** i ordning: "A1 Create valid case" sparar `arendeId` som används av "A7 Get case by id".

## Köra från terminalen (Newman)

```bash
npx newman run docs/api/kundportal.postman_collection.json \
  -e docs/api/kundportal.postman_environment.json \
  --folder Health --folder Ärenden
```

Mappen **Proposed (not in backend yet)** beskriver endpoints som frontend redan använder via mockar (`frontend/src/mocks/handlers.ts`). De misslyckas tills backend har byggt dem.

## OpenAPI

FastAPI publicerar också en OpenAPI-spec på <http://127.0.0.1:8000/openapi.json>. Den kan importeras direkt i Postman (**Import → Link**) som komplement.
