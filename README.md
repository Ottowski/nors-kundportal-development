# Kundserviceportalen NORS

A blank starter project for the NORS team, with a Python/FastAPI backend and a
React/TypeScript frontend.

## Requirements

- Python 3.10 or newer
- Node.js 20.19+ or 22.12+
- npm

## Run API

From the project root, set up the backend environment and start the API:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Create the virtual environment and install dependencies only the first time.
For later runs, open a terminal in the project root and run:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload
```

The API is available at <http://127.0.0.1:8000>. To try it interactively, open
<http://127.0.0.1:8000/docs>. Expand **POST `/arenden`**, click **Try it out**,
enter an example request, and click **Execute**:

```json
{
  "rubrik": "Problem med inloggning",
  "beskrivning": "Användaren kan inte logga in.",
  "kategori": "Support",
  "prioritet": "Normal"
}
```

The response should have status `201 Created`. The API sets the ID, status, and
creation time automatically. Use **GET `/arenden`** to list cases or
**GET `/arenden/{arende_id}`** to retrieve one case. Cases are stored in memory
and are cleared when the API server stops.

To stop the server, focus the terminal where it is running and press **Ctrl+C**.

## Run the frontend

In a second terminal, from the project root:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally <http://localhost:5173>).

Other frontend commands:

| Command | What it does |
| --- | --- |
| `npm run dev:mock` | Runs the UI on mocked API data (MSW). No backend needed. |
| `npm test` | Runs tests in watch mode (Vitest + Testing Library). |
| `npm run check` | Full build cycle: Prettier check, ESLint, TypeScript, tests, production build. |
| `npm run format` | Formats code with Prettier. |

## API tests (Postman)

Import `docs/api/kundportal.postman_collection.json` and
`docs/api/kundportal.postman_environment.json` in Postman, or run them from the
terminal. See [docs/api/README.md](docs/api/README.md).

## Team development

- Keep API code in `backend/app` and UI code in `frontend/src`.
- Create and activate the Python virtual environment before installing backend
  dependencies.
- Do not commit virtual environments, `node_modules`, or local `.env` files;
  these are ignored by Git.
- Add dependencies to `backend/requirements.txt` or `frontend/package.json` so
  the rest of the team can install them.
