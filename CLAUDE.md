# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Kundserviceportalen NORS: a blank team-project starter (course/examination context, Swedish-language UI and docs) with a FastAPI backend and a React (JavaScript, no TypeScript) + Vite frontend. The two halves are independent apps run in separate terminals; there is no root-level build or workspace setup (the root `package-lock.json` is empty and unused — dependencies live in `frontend/`).

## Rules for Claude

### General

- **Focus on a single task**: Work on one task at a time. Don't touch unrelated issues or features beyond the current request.
- **Clarity and conciseness**: Clear, easy-to-understand code and explanations. Avoid unnecessary jargon.
- **Error reporting**: Describe errors or impossibilities clearly and suggest solutions.
- **Privacy**: Never expose the operator's name, email or other private information without clearing it first, e.g. when interacting with external public services that ask for it.
- **Downloads folder**: Never open, read, list, search or run anything in `~/Downloads` (any letter case) without first asking and getting a yes. That covers Read, Bash (`cat`, `ls`, `grep`, `find`, `open`, …) and subagents. A pasted path or a task that seems to need the file is not permission. Name the exact file and what you will do with it; a yes covers only that file for that task. The user may instead move the file into the repo or paste the relevant part.

### Advice and decisions

Applies when presenting options, recommending a path, or answering a "should we…" question — not when carrying out a task that is already decided.

Challenge before answering. Check each point against code, docs or data rather than memory:

- **Wrong assumptions**: which premise in the question, or in your own first answer, does not hold?
- **What could fail**: edge cases, existing data, course/examination requirements, and the next feature that has to build on this.
- **Hidden upside**: is there a bigger outcome nearby that the question as asked would miss?

If the premises hold, say so in one line. Don't invent objections.

### Restrictions

- Never run any git commands (no status, diff, add, commit, push, pull, branch, etc.). The user handles all git operations; code changes are reviewed and committed by a human.
- Never read, open, grep, or otherwise access these secret files, and don't print their contents:
  - `frontend/.env.local`
  - `backend/.env`

## Commands

Setup, run and test commands live in `README.md` (backend: `uvicorn app.main:app --reload` from `backend/`; frontend: `npm run dev` from `frontend/`). Don't restate them here. The README shows PowerShell activation; on macOS/Linux use `source .venv/bin/activate`. There is no test runner or linter configured yet for either side.

## Architecture

- `backend/app/main.py` — single FastAPI `app` (`app.main:app`) with `/` and `/health`, mounts the routers. CORS is restricted to the Vite dev origins (`http://localhost:5173`, `http://127.0.0.1:5173`); if the frontend runs on another port/host, update `allow_origins` there.
- `frontend/src/` — `main.jsx` mounts `App.jsx`; currently only a welcome page. No API client or Vite dev proxy exists, so the frontend must call the backend by its full URL (`http://127.0.0.1:8000`), which is why CORS is configured.
- Dependencies are unpinned in `backend/requirements.txt`; add new ones there or in `frontend/package.json`.
- Decided but not yet on main: SQLite storage and a TypeScript frontend (being rebuilt on `frontend-v2`). See `docs/beslut.md`.

### Adding new backend code

Layers under `backend/app/`, one file per resource (`arende` is the reference example). Never put routes or storage logic in `main.py`.

1. **Schemas** — `schemas/<resurs>.py`: Pydantic models (`<Resurs>Create`, `<Resurs>`) and enums. Validation lives here.
2. **Repository** — `repositories/<resurs>_repository.py`: an abstract `<Resurs>Repository` contract, its implementations (in-memory today, SQLite later) and a `get_<resurs>_repository()` dependency. Swapping storage must not touch routers.
3. **Router** — `routers/<resurs>_router.py`: `APIRouter` with `prefix` and `tags`, repository injected via `Depends`, no storage logic. Mount it with `app.include_router(...)` in `main.py`.
4. **Tests** — `backend/tests/`, named after the acceptance criterion (see Documentation).

**SQLite layer** (decided in `docs/beslut.md`, not yet on this branch): the connection setup lives in `app/db.py`, the database file in `app/data/nors.db`, and each resource gets `repositories/sqlite_<resurs>_repository.py` implementing the same abstract contract as the in-memory one. Only `get_<resurs>_repository()` changes to return the SQLite implementation; schemas and routers stay untouched. Include a test that data survives a restart (`tests/test_omstart.py`).

### Adding new frontend code

The structure is decided when `frontend-v2` is built (TypeScript, per `docs/beslut.md`). Until then, keep new UI code in `frontend/src/` and don't add API-client or folder conventions ahead of that decision; record them in this section once agreed.

## Documentation

`docs/` (Swedish) is the single source of truth; start at `docs/README.md`. Don't restate requirements or decisions here, link to them.

- Requirements: `docs/specs/kravspec.md` (core flow) and one file per add-on (e.g. `docs/specs/sok-filter.md`). IDs: R# requirements, A# acceptance criteria, K# quality requirements, Q# open questions; add-on specs use a prefix (e.g. `SF-R1`). IDs are never renumbered.
- Spec-level decisions live in the spec (the Q# is marked answered); project-level decisions live in `docs/beslut.md`.
- Test names start with the A# id (`test_a2_...`, `it("A2: ...")`); traceability is in `docs/verifieringsplan.md`.
- Bounded agent assignments are documented in `docs/agentuppdrag/` using `docs/mallar/agentuppdrag.md`. Workflow: `docs/specs/spec-driven-dev.md`.

## Workflow notes

- PRs use the template at `.github/PULL_REQUEST_TEMPLATE/teamets-projekt.md` (final-version commit link, team info, links to shared docs). Individual written reports go to Disco as Markdown and must not be added to the repo; a blank template is in `docs/mallar/individuell-redovisning.md`.
- `.venv`, `node_modules` and `.env` are git-ignored; don't commit them.
