# Projekt

Problem, syfte, önskat resultat och avgränsning står i [kravspecen](specs/kravspec.md). Motiveringen till varje val står i [beslut.md](beslut.md).

## Teknikval

| Del              | Val                      | Status                                                                                   |
| ---------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| Backend          | Python 3.10+ med FastAPI | Används på `main`.                                                                       |
| Lagring          | SQLite                   | Används på `main` sedan PR #2. Ärendena finns kvar när appen startas om.                 |
| Frontend         | React med Vite           | Kom med startprojektet och används.                                                      |
| Språk i frontend | TypeScript               | Beslutat. Byggs på branchen `frontend-v2`. `main` har fortfarande JavaScript.            |
| Tester           | pytest (backend)         | Används på `main` sedan PR #2. Det finns ett test: att ärenden finns kvar efter omstart. |

Översikt över hur koden är uppbyggd finns i [CLAUDE.md](../CLAUDE.md). Hur man kör appen och testerna står i [README.md](../README.md).

## Arbetsfördelning

Alla hjälps åt, men var och en har ett huvudansvar.

| Person   | Huvudansvar             |
| -------- | ----------------------- |
| Otto     | Backend                 |
| Ruben    | Databas                 |
| Sravani  | Testning                |
| Nathalie | Frontend, dokumentation |

Fördelningen bestämdes vecka 4, se [veckostatus](veckostatus.md).
