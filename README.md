# Kundserviceportalen NORS

A blank starter project for the NORS team, with a Python/FastAPI backend and a
React/JavaScript frontend.

## Requirements

- Python 3.10 or newer
- Node.js 20.19+ or 22.12+
- npm

## Run the backend

From the project root:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

The API is available at <http://127.0.0.1:8000>. Interactive API
documentation is at <http://127.0.0.1:8000/docs>.

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
