# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Kundserviceportalen NORS: a blank team-project starter (course/examination context, Swedish-language UI and docs) with a FastAPI backend and a React (JavaScript, no TypeScript) + Vite frontend. The two halves are independent apps run in separate terminals; there is no root-level build or workspace setup (the root `package-lock.json` is empty and unused — dependencies live in `frontend/`).

## Commands

Backend (from `backend/`, Python 3.10+; README shows PowerShell/Windows activation `.\.venv\Scripts\Activate.ps1`, on macOS/Linux use `source .venv/bin/activate`):

```
python -m venv .venv
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload     # http://127.0.0.1:8000, docs at /docs
```

Frontend (from `frontend/`, Node 20.19+ or 22.12+):

```
npm install
npm run dev       # Vite dev server, http://localhost:5173
npm run build
npm run preview
```

Backend tests (from `backend/`): `python -m pytest`. `tests/test_omstart.py` starts real uvicorn processes against a temp DB via `NORS_DB_PATH` to check that cases survive a restart. No frontend tests and no linter are configured yet.
API tests: Postman collection in `docs/api/` (see `docs/api/README.md`), run with `npx newman run docs/api/kundportal.postman_collection.json -e docs/api/kundportal.postman_environment.json`.

## Architecture

- `backend/app/main.py` — single FastAPI `app` (`app.main:app`) with `/` and `/health`. CORS is restricted to the Vite dev origins (`http://localhost:5173`, `http://127.0.0.1:5173`); if the frontend runs on another port/host, update `allow_origins` there.
- `frontend/src/` — `main.jsx` mounts `App.jsx`; currently only a welcome page. No API client or Vite dev proxy exists, so the frontend must call the backend by its full URL (`http://127.0.0.1:8000`), which is why CORS is configured.
- Dependencies are unpinned in `backend/requirements.txt`; add new ones there or in `frontend/package.json`.

## Workflow notes

- PRs use the template at `.github/PULL_REQUEST_TEMPLATE/teamets-projekt.md` (final-version commit link, team info, links to shared docs). Individual written reports go to Disco as Markdown and must not be added to the repo.
- `.venv`, `node_modules` and `.env` are git-ignored; don't commit them.

## Restrictions

- Never run any git commands (no status, diff, add, commit, push, branch, etc.). The user handles all git operations.
- Never read, open, grep, or otherwise access these secret files, and don't print their contents:
  - `frontend/.env.local`
  - `backend/.env`
