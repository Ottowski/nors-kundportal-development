# Projekt

Problem, syfte, önskat resultat och avgränsning står i [kravspecen](specs/kravspec.md).

## Teknikval

| Del      | Val                         | Status                                                                                                   |
| -------- | --------------------------- | -------------------------------------------------------------------------------------------------------- |
| Backend  | FastAPI (Python 3.10+)      | I bruk                                                                                                   |
| Lagring  | SQLite                      | Beslutat, se [beslut.md](beslut.md). Main lagrar fortfarande ärenden i minnet.                           |
| Frontend | React + TypeScript med Vite | Beslutat, se [beslut.md](beslut.md). Main har fortfarande JavaScript-startern tills `frontend-v2` är mergad. |

Se `CLAUDE.md` för arkitekturöversikt.

Motivering: står per beslut i [beslut.md](beslut.md). Motiveringen för FastAPI och för TypeScript är inte ifylld ännu (flaggat som kvarstående i veckostatus vecka 4–5, ansvarig: ?).

## Arbetsfördelning

Otto (Backend), Sravani (Testing), Ruben (Databas/Query), Nathalie (Frontend). Ej satt i sten, vi hjälps åt.

Preliminär fördelning från vecka 4 (se veckostatus vecka 4, punkt 8).
