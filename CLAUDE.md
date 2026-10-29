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

There is no test runner or linter configured yet for either side.

## Architecture

- `backend/app/main.py` — single FastAPI `app` (`app.main:app`) with `/` and `/health`. CORS is restricted to the Vite dev origins (`http://localhost:5173`, `http://127.0.0.1:5173`); if the frontend runs on another port/host, update `allow_origins` there.
- `frontend/src/` — `main.jsx` mounts `App.jsx`; currently only a welcome page. No API client or Vite dev proxy exists, so the frontend must call the backend by its full URL (`http://127.0.0.1:8000`), which is why CORS is configured.
- Dependencies are unpinned in `backend/requirements.txt`; add new ones there or in `frontend/package.json`.
- Decided but not yet on main: SQLite storage and a TypeScript frontend (being rebuilt on `frontend-v2`). See `docs/beslut.md`.

## Documentation

`docs/` (Swedish) is the single source of truth; start at `docs/README.md`. Don't restate requirements or decisions here, link to them.

- Requirements: `docs/specs/kravspec.md` (core flow) and one file per add-on (e.g. `docs/specs/sok-filter.md`). IDs: R# requirements, A# acceptance criteria, K# quality requirements, Q# open questions; add-on specs use a prefix (e.g. `SF-R1`). IDs are never renumbered.
- Spec-level decisions live in the spec (the Q# is marked answered); project-level decisions live in `docs/beslut.md`.
- Test names start with the A# id (`test_a2_...`, `it("A2: ...")`); traceability is in `docs/verifieringsplan.md`.
- Bounded agent assignments are documented in `docs/agentuppdrag/` using `docs/mallar/agentuppdrag.md`. Workflow: `docs/specs/spec-driven-dev.md`.

## Workflow notes

- PRs use the template at `.github/PULL_REQUEST_TEMPLATE/teamets-projekt.md` (final-version commit link, team info, links to shared docs). Individual written reports go to Disco as Markdown and must not be added to the repo; a blank template is in `docs/mallar/individuell-redovisning.md`.
- `.venv`, `node_modules` and `.env` are git-ignored; don't commit them.

## Restrictions

- Never run any git commands (no status, diff, add, commit, push, branch, etc.). The user handles all git operations.
- Never read, open, grep, or otherwise access these secret files, and don't print their contents:
  - `frontend/.env.local`
  - `backend/.env`
