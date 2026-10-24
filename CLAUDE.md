# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Kundserviceportalen NORS: a blank team-project starter (course/examination context, Swedish-language UI and docs) with a FastAPI backend and a React + TypeScript + Vite frontend. The two halves are independent apps run in separate terminals; there is no root-level build or workspace setup (the root `package-lock.json` is empty and unused — dependencies live in `frontend/`).

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
npm run dev        # Vite dev server against real backend, http://localhost:5173
npm run dev:mock   # same UI on MSW mocks (no backend needed; includes proposed endpoints)
npm test           # Vitest watch; npm run test:run for one pass
npm run check      # full cycle: prettier check, eslint, tsc, tests, build (CI runs this)
npm run format     # prettier --write
```

API tests: Postman collection in `docs/api/` (see `docs/api/README.md`), run with `npx newman run docs/api/kundportal.postman_collection.json -e docs/api/kundportal.postman_environment.json`.

## Architecture

- `backend/app/main.py` — single FastAPI `app` (`app.main:app`) with `/` and `/health`. CORS is restricted to the Vite dev origins (`http://localhost:5173`, `http://127.0.0.1:5173`); if the frontend runs on another port/host, update `allow_origins` there.
- `frontend/src/` — `main.tsx` mounts `App.tsx` (and starts the MSW worker in `--mode mock`). `api/arendenApi.ts` is the only place that calls `fetch`; it normalizes FastAPI errors (`detail` string or 422 list) into `ApiError` with per-field messages. Base URL is `VITE_API_URL` or `http://127.0.0.1:8000` (no Vite proxy, hence CORS).
- `frontend/src/mocks/handlers.ts` mirrors the backend and also serves the proposed `POST /arenden/{id}/status`. Tests use it via `msw/node` (`src/test/setup.ts`); `db.reset()` runs after each test.
- Search/filter runs in the frontend on the loaded list (`utils/filterArenden.ts`) because the backend has no search endpoint (open question Q9). Category/priority values in `constants/arende.ts` are provisional proposals (Q1/Q2).
- Edit/delete (outside v1.0 scope, no backend API) are gated by `isEditDeleteEnabled()` in `constants/features.ts`: on in `--mode mock`, off otherwise unless `VITE_ENABLE_EDIT_DELETE=true`. Tests stub it to `true` in `src/test/setup.ts`.
- Spec and requirement ids (R#, A#, Q#) live in the sibling repo `../kundportal-sdd/specs/`.
- Dependencies are unpinned in `backend/requirements.txt`; add new ones there or in `frontend/package.json`.

## Workflow notes

- PRs use the template at `.github/PULL_REQUEST_TEMPLATE/teamets-projekt.md` (final-version commit link, team info, links to shared docs). Individual written reports go to Disco as Markdown and must not be added to the repo.
- `.venv`, `node_modules` and `.env` are git-ignored; don't commit them.

## Restrictions

- Never run any git commands (no status, diff, add, commit, push, branch, etc.). The user handles all git operations.
- Never read, open, grep, or otherwise access these secret files, and don't print their contents:
  - `frontend/.env.local`
  - `backend/.env`
