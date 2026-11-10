# Veckostatus

Varje kolumn ska innehålla följande, enligt uppgiftsbeskrivningen:

- **Planerat** - vad ni tänkte göra.
- **Genomfört** - vad ni faktiskt har gjort, med länkar till relevanta förändringar.
- **Verifierat** - vilka kontroller ni har kört och vad de visade.
- **Osäkert eller ofärdigt** - vad som återstår eller behöver undersökas.
- **Nästa steg** - vad ni arbetar vidare med och vem som ansvarar.

**Teckenförklaring:** ✅ Klar · ❌ Ej klar · 🔄 Pågår · ➡️ Flyttas till annan vecka

En uppgift som inte blir klar sin planerade vecka tas upp igen i nästa veckas tabell, med en notering om vilken vecka den kommer från.

## Så här fyller du i

- Lägg till en ny rad längst ner i den aktuella veckans tabell för varje uppgift. `#` är bara ett löpnummer för den veckan.
- Om en uppgift inte blir klar: kopiera raden till nästa veckas tabell, skriv `(fortsätter från vecka X)` efter texten i **Planerat**, markera löpnumret med ➡️ direkt efter siffran, med `&nbsp;` emellan så de inte radbryts (t.ex. `6&nbsp;➡️`), och fyll i vad som faktiskt hände i övriga kolumner.
- Ta bort placeholder texten så fort ni lägger till första riktiga raden för veckan.

## Vecka 4

| #   | Planerat                                                                         | Genomfört                                                                                                         | Verifierat                                   | Osäkert eller ofärdigt                                                         | Nästa steg                                               |
| --- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------- |
| 1   | Bestämma teamnamn                                                                | ✅ NORS - se [PR-mall](../.github/PULL_REQUEST_TEMPLATE/teamets-projekt.md)                                       | Bekräftat muntligt av hela teamet under möte | -                                                                              | -                                                        |
| 2   | Lista GitHub-användarnamn                                                        | ✅ Se [PR-mall](../.github/PULL_REQUEST_TEMPLATE/teamets-projekt.md)                                              | Bekräftat mot respektive GitHub-profil       | -                                                                              | -                                                        |
| 3   | Utse vem som skapar forken                                                       | ✅ Ottowski skapade forken                                                                                        | Forken verifierad tillgänglig på GitHub      | -                                                                              | -                                                        |
| 4   | Bestämma kommunikationskanaler och mötesfrekvens                                 | ✅ Slack, Notion och Meet, 1-2 ggr/vecka (efter föreläsningar tis/tors ca 12:30)                                  | -                                            | -                                                                              | -                                                        |
| 5   | Välja och motivera teknikstack                                                   | ✅➡️ VS Code, backend (Java/Python/GoLang), frontend (JS React, Node)                                             | -                                            | Motivering till teknikvalet är inte nedskriven i `docs/teknikval.md` ännu      | Fylla i motivering i `docs/teknikval.md` - ansvarig:?    |
| 6   | Avgränsa första versionens omfattning                                            | ✅ v1.0 omfattar Status, Lista, Skapa. Utanför: inloggning, e-post, molndrift - se [kravspec.md](specs/kravspec.md#avgränsning) | -                                            | Avgränsningen är inte dokumenterad i `docs/specs/kravspec.md` (Avgränsning-avsnittet) | Fylla i `docs/specs/kravspec.md` - ansvarig?             |
| 7   | Välja tillägg                                                                    | ✅ Sökning/filtrering                                                                                             | -                                            | -                                                                              | -                                                        |
| 8   | Fördela roller                                                                   | ✅ Otto (Backend), Sravani (Testing), Ruben (Databas/Query), Nathalie (Frontend)                                  | -                                            | Rollerna är förslag, inte slutgiltigt beslutade                                | Bekräfta rollfördelning - ansvarig: alla                 |
| 9   | Sätta upp projektets grund med en struktur för backend och frontend                | ➡️ Arbetet flyttades till vecka 5                                                                                 | -                                            | Grundstrukturen återstod att sätta upp                                         | ➡️ Sätta upp grundstrukturen vecka 5 - ansvarig: Otto    |
| 10  | Bestämma granskningsrutin                                                        | ✅ Interna PR:er, GitHub-branches, PR → SecondaryMain, granskas innan Main                                        | -                                            | -                                                                              | -                                                        |
| 11  | Välja AI-verktyg                                                                 | ✅ Claude - se `docs/ai-arbetssatt.md`                                                                            | -                                            | `docs/ai-arbetssatt.md` är inte ifyllt ännu                                    | Fylla i `docs/ai-arbetssatt.md` - ansvarig?              |
| 12  | Skapa CLAUDE.md som gemensam grund för AI-verktyg (arkitektur och restriktioner) | ✅ Ruben skapade `CLAUDE.md` - se commit `9ad9985` (Create CLAUDE.md)                                             | ev. kontroll som kördes?                     | -                                                                              | -                                                        |
| 13  | Skapa env-filer för att skydda secrets från att läcka                            | ✅ Ruben skapade env-filer - se commit `5a3b9a9` (env prep)                                                       | ev. kontroll som kördes?                     | -                                                                              | -                                                        |
| 14  | Undersöka datahantering och lagring för projektet                                | 🔄                                                                                                                | -                                            | -                                                                              | ➡️ lägg till beslut i `docs/beslut.md` - ansvarig: Ruben |

## Vecka 5

| #   | Planerat                                                                                          | Genomfört                                             | Verifierat                          | Osäkert eller ofärdigt | Nästa steg                                    |
| --- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------- | ---------------------- | --------------------------------------------- |
| 9&nbsp;➡️  | Sätta upp projektets grund (fortsätter från vecka 4)                                              | ✅ Otto satte upp grundstrukturen måndag v.5          | beskriv vilken kontroll som kördes? | -                      | -                                             |
| 5&nbsp;➡️  | Motivera teknikval - dokumentera i `docs/teknikval.md` (fortsätter från vecka 4)                  | 🔄 Python valdes för backend bland annat för sitt väletablerade ekosystem och stöd för integration med AI | - | AI-motiveringen är ännu inte dokumenterad i [beslut.md](beslut.md), som [teknikval.md](teknikval.md) hänvisar till | Komplettera motiveringen i `docs/beslut.md` - ansvarig: ? |
| 6&nbsp;➡️  | Avgränsa första versionens omfattning - dokumentera i `docs/specs/kravspec.md` (fortsätter från vecka 4) |                                                       | -                                   | Avgränsningen är fortfarande inte dokumenterad | Fylla i `docs/specs/kravspec.md` - ansvarig: ? |
| 11&nbsp;➡️ | Välja AI-verktyg - dokumentera i `docs/ai-arbetssatt.md` (fortsätter från vecka 4)                | ✅ Claude valdes tidigt i processen, redan vecka 4. Claude Code i VS Code och Claude i webbläsaren beskrivs i [ai-arbetssatt.md](ai-arbetssatt.md) | Dokumentet innehåller verktyg, arbetssätt och rutiner för granskning | - | - |
| 13   | Skapa dokumentationsmapp med filer för dokumentation                                              | ✅ Dokumentationsmapp skapad och uppsatt - se `docs/` | Gick igenom tillsammans under möte  | -                      | -                                             |
| 14   | Bygga första frontenden (React, TypeScript, Vite) med mockar                                      | ✅ Sravani byggde ärendegränssnittet: lista, skapa, detaljer, statusändring och sök/filter, med MSW-mockar och Vitest-tester - se commit `ab1d447` på branchen `frontend` | Vitest-testerna mot mockarna gick igenom (65 av 65 vid kontroll 2026-11-05) | Byggdes innan specen fanns. Innehöll redigering och borttagning, som ligger utanför v1.0 | Teamet bygger om frontenden mot specen, se [beslut.md](beslut.md) 2026-10-29 - ansvarig: Ruben, Nathalie |

_Fler punkter fylls i allt eftersom veckan pågår._

## Vecka 6

| #         | Planerat                                 | Genomfört                           | Verifierat                                  | Osäkert eller ofärdigt | Nästa steg                             |
| --------- | ---------------------------------------- | ----------------------------------- | ------------------------------------------- | ---------------------- | -------------------------------------- |
| _Exempel_ | _Kort beskrivning av vad som planerades_ | _✅/❌ + vad som gjordes, med länk_ | _Vilken kontroll kördes och vad den visade_ | _Vad som återstår_     | _Vad som är näst och vem som ansvarar_ |

_Radera exempelraden ovan och lägg till riktiga rader här._

## Vecka 7

| #         | Planerat                                 | Genomfört                           | Verifierat                                  | Osäkert eller ofärdigt | Nästa steg                             |
| --------- | ---------------------------------------- | ----------------------------------- | ------------------------------------------- | ---------------------- | -------------------------------------- |
| 1         | Skriva testspecifikation för QA (QA-1–QA-7) | ✅ Sravani skrev testspecifikationen med testaktiviteter, acceptanskriterier och spårbarhet - se [testing/testing-spec.md](testing/testing-spec.md) | Kontrollerad mot körningar 2026-11-05: 65 av 65 frontendtester och 20 av 20 Postman-kontroller gick igenom | Specen använde gamla id (A11–A16) och låg på branchen `frontend`, som låg efter `main`. Fyra möjliga defekter i API:t (QA-4) är bara handprövade, inte sparade som tester | Uppdatera specen till dagens id - ansvarig: Sravani |
| 2         | Flytta QA-arbetet till senaste `main`    | ✅ Det ursprungliga arbetet är sparat med taggen `frontend-original-2026-11-08`. Ny branch `qa-frontend-testing` från `origin/main` (`9ea263b`) | `npm run check` i `frontend/` gick igenom: 5 testfiler, 54 tester - se [logg](testing/evidence/2026-11-08-baseline-npm-run-check.txt) | -                      | -                                      |

## Vecka 8

| #         | Planerat                                 | Genomfört                           | Verifierat                                  | Osäkert eller ofärdigt | Nästa steg                             |
| --------- | ---------------------------------------- | ----------------------------------- | ------------------------------------------- | ---------------------- | -------------------------------------- |
| 1         | Uppdatera testspecifikationen och samla testbevis | ✅ Testspecifikationen följer nu A1–A12, SF-A1–SF-A14 och K1. Mappen [testing/](testing/README.md) har testbevis, felrapporter och bilagor till manuella kontroller | `npm run check` 2026-11-09: 54 av 54 tester gick igenom - se [logg](testing/evidence/2026-11-09-baseline-npm-run-check.txt) | QA-4 (negativa API-tester) och kontrollen av hela kedjan mot riktig backend återstår | QA-4 - ansvarig: Sravani |
| 2         | Rätta svagheterna i A2–A4-testerna i formuläret | 🔄 A2 och A3 är rättade: testerna kontrollerar nu att två ärenden finns före handlingen och att formuläret inte skickar något anrop. Varje kontroll har setts misslyckas - se [agentuppdraget](agentuppdrag/2026-11-09-a2-a4-form-tests.md). Sravani tar över testerna från Ruben (beslutat på möte 2026-11-09) | `npm run check` 2026-11-09: 54 av 54 tester gick igenom, och 68 av 68 efter merge av `main` - se [logg](testing/evidence/2026-11-09-baseline-after-merge-npm-run-check.txt). Bevis: [A2](testing/evidence/2026-11-09-A2-can-fail.txt), [A3](testing/evidence/2026-11-09-A3-can-fail.txt) | A4: användaren kan inte välja en otillåten kategori i formuläret. Teamet beslutar hur A4 ska prövas | Teamet beslutar om A4 (kontrollpunkt 2), sedan rättar Sravani A4 - ansvarig: teamet, Sravani |
