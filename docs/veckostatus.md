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
| 5   | Välja och motivera teknikstack                                                   | ✅➡️ VS Code, backend (Java/Python/GoLang), frontend (JS React, Node)                                             | -                                            | Motivering till teknikvalet är inte nedskriven i `docs/projekt.md` ännu        | Fylla i motivering i `docs/projekt.md` - ansvarig:?      |
| 6   | Avgränsa första versionens omfattning                                            | ✅ v1.0 omfattar Status, Lista, Skapa. Utanför: inloggning, e-post, molndrift - **[länk till projekt.md saknas]** | -                                            | Avgränsningen är inte dokumenterad i `docs/projekt.md` (Avgränsning-avsnittet) | Fylla i `docs/projekt.md` - ansvarig?                    |
| 7   | Välja tillägg                                                                    | ✅ Sökning/filtrering                                                                                             | -                                            | -                                                                              | -                                                        |
| 8   | Fördela roller                                                                   | ✅ Otto (Backend), Sravani (Testing), Ruben (Databas/Query), Nathalie (Frontend)                                  | -                                            | Rollerna är förslag, inte slutgiltigt beslutade                                | Bekräfta rollfördelning - ansvarig: alla                 |
| 9   | Sätta upp projektets grund                                                       | ➡️                                                                                                                | -                                            |                                                                                | ➡️ Flyttas till vecka 5 - ansvarig: Otto                 |
| 10  | Bestämma granskningsrutin                                                        | ✅ Interna PR:er, GitHub-branches, PR → SecondaryMain, granskas innan Main                                        | -                                            | -                                                                              | -                                                        |
| 11  | Välja AI-verktyg                                                                 | ✅ Claude - se `docs/ai-arbetssatt.md`                                                                            | -                                            | `docs/ai-arbetssatt.md` är inte ifyllt ännu                                    | Fylla i `docs/ai-arbetssatt.md` - ansvarig?              |
| 12  | Skapa CLAUDE.md som gemensam grund för AI-verktyg (arkitektur och restriktioner) | ✅ Ruben skapade `CLAUDE.md` - se commit `9ad9985` (Create CLAUDE.md)                                             | ev. kontroll som kördes?                     | -                                                                              | -                                                        |
| 13  | Skapa env-filer för att skydda secrets från att läcka                            | ✅ Ruben skapade env-filer - se commit `5a3b9a9` (env prep)                                                       | ev. kontroll som kördes?                     | -                                                                              | -                                                        |
| 14  | Undersöka datahantering och lagring för projektet                                | 🔄                                                                                                                | -                                            | -                                                                              | ➡️ lägg till beslut i `docs/beslut.md` - ansvarig: Ruben |

## Vecka 5

| #   | Planerat                                                                                          | Genomfört                                             | Verifierat                          | Osäkert eller ofärdigt | Nästa steg                                    |
| --- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------- | ---------------------- | --------------------------------------------- |
| 9&nbsp;➡️  | Sätta upp projektets grund (fortsätter från vecka 4)                                              | ✅ Otto satte upp grundstrukturen måndag v.5          | beskriv vilken kontroll som kördes? | -                      | -                                             |
| 5&nbsp;➡️  | Motivera teknikval - dokumentera i `docs/projekt.md` (fortsätter från vecka 4)                    |                                                       | -                                   | Motivering till teknikvalet är fortfarande inte nedskriven | Fylla i `docs/projekt.md` - ansvarig: ? |
| 6&nbsp;➡️  | Avgränsa första versionens omfattning - dokumentera i `docs/projekt.md` (fortsätter från vecka 4) |                                                       | -                                   | Avgränsningen är fortfarande inte dokumenterad | Fylla i `docs/projekt.md` - ansvarig: ?       |
| 11&nbsp;➡️ | Välja AI-verktyg - dokumentera i `docs/ai-arbetssatt.md` (fortsätter från vecka 4)                |                                                       | -                                   | `docs/ai-arbetssatt.md` är fortfarande inte ifyllt | Fylla i `docs/ai-arbetssatt.md` - ansvarig: ? |
| 13   | Skapa dokumentationsmapp med filer för dokumentation                                              | ✅ Dokumentationsmapp skapad och uppsatt - se `docs/` | Gick igenom tillsammans under möte  | -                      | -                                             |

_Fler punkter fylls i allt eftersom veckan pågår._

## Vecka 6

| #         | Planerat                                 | Genomfört                           | Verifierat                                  | Osäkert eller ofärdigt | Nästa steg                             |
| --------- | ---------------------------------------- | ----------------------------------- | ------------------------------------------- | ---------------------- | -------------------------------------- |
| _Exempel_ | _Kort beskrivning av vad som planerades_ | _✅/❌ + vad som gjordes, med länk_ | _Vilken kontroll kördes och vad den visade_ | _Vad som återstår_     | _Vad som är näst och vem som ansvarar_ |

_Radera exempelraden ovan och lägg till riktiga rader här._

## Vecka 7

| #         | Planerat                                 | Genomfört                           | Verifierat                                  | Osäkert eller ofärdigt | Nästa steg                             |
| --------- | ---------------------------------------- | ----------------------------------- | ------------------------------------------- | ---------------------- | -------------------------------------- |
| _Exempel_ | _Kort beskrivning av vad som planerades_ | _✅/❌ + vad som gjordes, med länk_ | _Vilken kontroll kördes och vad den visade_ | _Vad som återstår_     | _Vad som är näst och vem som ansvarar_ |

_Radera exempelraden ovan och lägg till riktiga rader här._

## Vecka 8

| #         | Planerat                                 | Genomfört                           | Verifierat                                  | Osäkert eller ofärdigt | Nästa steg                             |
| --------- | ---------------------------------------- | ----------------------------------- | ------------------------------------------- | ---------------------- | -------------------------------------- |
| _Exempel_ | _Kort beskrivning av vad som planerades_ | _✅/❌ + vad som gjordes, med länk_ | _Vilken kontroll kördes och vad den visade_ | _Vad som återstår_     | _Vad som är näst och vem som ansvarar_ |

_Radera exempelraden ovan och lägg till riktiga rader här._
