# Agent assignment: Fix the weaknesses in the A2–A4 form tests

> Written in English. The sections follow [the template](../mallar/agentuppdrag.md) in the same
> order: Before (Mål, Kontext, Avgränsning, Faktiska behörigheter, Kontrollpunkter, Klart när,
> Instruktionen) and After.

- **Owner:** Sravani. Took over the A2–A4 component tests from Ruben, agreed at the team meeting
  on 2026-11-09.
- **Date:** 2026-11-09
- **Agent and tools:** Claude Code, the `frontend-developer` agent with the
  [verifiera-mot-spec](../../.claude/skills/verifiera-mot-spec/SKILL.md) skill
- **PR:** [#15](https://github.com/Ottowski/nors-kundportal-development/pull/15)

## Before

### Goal

A2, A3 and A4 in `frontend/src/components/ArendeForm.test.tsx` check what
[kravspec.md](../specs/kravspec.md) requires, and every check has been seen to fail (step 4 in the
[verification plan](../verifieringsplan.md)).

The weaknesses come from run 3 in the
[skill checklist assignment](2026-11-05-skill-checklista.md). Line numbers refer to commit `9ea263b`:

- **A2, line 60, and A3, line 78:** `expect(db.arenden).toHaveLength(2)` fails only if both the
  form's own validation and the mock's validation are broken.
- **A2 and A3:** the starting state (two cases) is not checked before the action.
- **A4, line 116:** `expect(db.arenden).toHaveLength(2)` can never fail, because the `server.use`
  handler never writes to `db`.
- **A4:** the action in the spec is never performed. No category that is not allowed is sent; the
  form sends "Leverans".
- **A4:** `server.use` replaces the mock's own category check.
- **A4:** `KATEGORI_ERROR` is a copy of `MESSAGES.kategori` in `src/mocks/handlers.ts`, so the test
  still passes if the mock's text changes.
- **A4, line 114:** checking that the title keeps its value is not required by A4.
- **A4 and R12:** stripping the "Value error, " prefix is tested in `src/api/arendenApi.test.ts`
  (line 55), not here. Note this in the report; don't fix it.

This assignment does not change the status of A2–A4 in the verification plan. They stay Planned
until Otto's API tests exist.

### Context

- [CLAUDE.md](../../CLAUDE.md)
- [kravspec.md](../specs/kravspec.md): A2–A4, R2–R4, R12
- [verifieringsplan.md](../verifieringsplan.md): the six steps under "Kod som byggdes före specen"
- [skill checklist assignment](2026-11-05-skill-checklista.md)
- `frontend/src/mocks/handlers.ts`, `frontend/src/test/setup.ts`, `frontend/src/api/arendenApi.test.ts`
- [Baseline before the change](../testing/evidence/2026-11-09-baseline-npm-run-check.txt): 54 of 54
  pass

### Scope

- **May change:** `frontend/src/components/ArendeForm.test.tsx`, only the A2–A4 tests and the
  shared helpers they use.
- **May change only temporarily, to show a check failing, and must be undone right after:**
  `frontend/src/components/ArendeForm.tsx`, `frontend/src/mocks/handlers.ts`.
- **Must not change:** the specs, the verification plan (Sravani updates it), other tests, other
  source files, `package.json` and dependencies.
- **Not included:** the A4 rewrite before checkpoint 2 is decided, API tests in `backend/`
  (Otto), and the R12 prefix test.

### Actual permissions

The agent has Read, Grep, Glob, Edit, Write and Bash. Bash can technically run git, but the
instruction and CLAUDE.md forbid it; Sravani runs all git commands. CLAUDE.md also forbids opening
`frontend/.env.local` and `backend/.env`. The agent can run `npm run test:run` and `npm run check`
in `frontend/`.

### Checkpoints

1. **After the plan for each test, before any edit.** One test at a time: A2, then A3, then A4.
2. **Before A4 is changed.** A user cannot pick a category that is not allowed in the form, so the
   action in A4 cannot be done through the UI. The team decides between:
   - the frontend A4 test only shows that the backend's rejection is displayed, and "nothing saved"
     is proven by the API test (Otto) and `arendenApi.test.ts`; or
   - a new open question (Q#) in kravspec.md.
3. **After each proof that a check can fail:** show the temporary change, the failing test output,
   and that the change has been undone.

### Done when

- Every check in A2–A4 has been seen to fail with a temporary wrong change. Each proof is saved in
  `docs/testing/evidence/` as `YYYY-MM-DD-A#-can-fail.txt`, following
  [the evidence rules](../testing/README.md#rules).
- All temporary changes are undone. Sravani checks that the diff touches only
  `ArendeForm.test.tsx`.
- `npm run check` passes in `frontend/`, and the test names still start with `A2:`, `A3:` and `A4:`.

### Instruction

> Use the verifiera-mot-spec skill to fix A2, A3 and A4 in
> frontend/src/components/ArendeForm.test.tsx against the weaknesses listed under Goal in
> docs/agentuppdrag/2026-11-09-a2-a4-form-tests.md. Work on one test at a time. Only the test file
> may change permanently; undo every temporary change right after the test has failed. Save each
> proof in docs/testing/evidence/ following docs/testing/README.md. Run no git commands. Stop at
> every checkpoint in the assignment and wait for my answer.

## After

### Plan and our decision

**A2 (approved by Sravani on 2026-11-09, unchanged).** The checklist in the skill found two
weaknesses: the starting state was not checked, and "still two cases" and `onSaved` could fail only
if both the form and the mock were broken. The plan:

- check `db.arenden` has two cases before the action;
- record every `POST /arenden` with a helper on `server.events`, and check that the form sends
  none, so "nothing saved" depends on the form alone; a local `afterEach` removes the listener,
  so `src/test/setup.ts` is untouched;
- keep the message, `aria-invalid`, `onSaved` and two-cases checks;
- prove each check can fail with one temporary change per run, using `expect.soft` temporarily
  when one change makes several checks fail.

**A3 (approved by Sravani on 2026-11-09, unchanged).** The same two weaknesses as A2, fixed the
same way with the same helper. The proof that the message check can fail removes `.trim()` from
the form's `validate`, which is the rule A3 tests: a title of only spaces counts as empty.

### Review

- **Reviewed by:**
- **What we found:**
- **Work outside the assignment that was removed:**
- **Accepted, changed or rejected, and why:**

### Verification

| Command | Result | Date |
| ------- | ------ | ---- |
| `npx vitest run src/components/ArendeForm.test.tsx -t "A2"`, once per temporary change | A2: every check failed at least once, 5 runs; every change undone and checked byte for byte; see [A2 proof](../testing/evidence/2026-11-09-A2-can-fail.txt) | 2026-11-09 |
| `npm run check` in `frontend/` after the A2 change | Exit 0: format, lint, typecheck and build pass; 5 test files, 54 tests pass | 2026-11-09 |
| `npx vitest run src/components/ArendeForm.test.tsx -t "A3"`, once per temporary change | A3: every check failed at least once, 4 runs; every change undone and checked byte for byte; see [A3 proof](../testing/evidence/2026-11-09-A3-can-fail.txt) | 2026-11-09 |
| `npm run check` in `frontend/` after the A3 change | Exit 0: format, lint, typecheck and build pass; 5 test files, 54 tests pass | 2026-11-09 |
| `npm run check` in `frontend/` after merging `main` (`c8077a4`) into the branch | Exit 0: format, lint, typecheck and build pass; 7 test files, 68 tests pass, A2 and A3 included; see [log](../testing/evidence/2026-11-09-baseline-after-merge-npm-run-check.txt) | 2026-11-09 |
| `npx vitest run src/components/ArendeForm.test.tsx -t "A2\|A3"` after the recorder was changed to spy on `fetch` (code review findings 1 and 4) | The no-POST check failed in A2 and A3 with a request fired in the background, and nothing else failed; change undone and checked byte for byte; see [no-POST proof](../testing/evidence/2026-11-09-A2-A3-no-post-can-fail.txt) | 2026-11-09 |
| `npm run check` in `frontend/` after the recorder change | Exit 0: format, lint, typecheck and build pass; 5 test files, 54 tests pass | 2026-11-09 |

### Deviations and open questions

- **How the work was run:** Claude Code ran the
  [verifiera-mot-spec](../../.claude/skills/verifiera-mot-spec/SKILL.md) skill directly in the
  main session, not through the `frontend-developer` agent, so that it could stop at each
  checkpoint and wait for Sravani's answer.
- **A2, line 73:** when the form sends despite errors and the mock rejects, the mock's text
  replaces the form's, so the message check fails before the no-request check. The no-request
  check was seen to fail on its own in run 5. Recorded in the A2 proof.
- **Verification plan:** Sravani changed the A2–A4 component owner from Ruben to Sravani. Status
  stays Planned until Otto's API tests exist.
- **After merging `main` on 2026-11-09:** Otto's API tests for A2–A4 exist, and `main` marks A2–A4
  Genomförd. The merge conflict in the verification plan was resolved by keeping the team's API
  tests, status and results, and adding Sravani as component owner and the 2026-11-09 component
  results for A2 and A3. A4 is Genomförd on `main` although its component test still has the
  weaknesses listed under Goal; the team should confirm this together with checkpoint 2.
