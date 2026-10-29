# Kundserviceportalen NORS

A blank starter project for the NORS team, with a Python/FastAPI backend and a
React/JavaScript frontend.

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

## Team development

- Keep API code in `backend/app` and UI code in `frontend/src`.
- Create and activate the Python virtual environment before installing backend
  dependencies.
- Do not commit virtual environments, `node_modules`, or local `.env` files;
  these are ignored by Git.
- Add dependencies to `backend/requirements.txt` or `frontend/package.json` so
  the rest of the team can install them.
