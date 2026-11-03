# Verifieringsplan

Planen visar vilka tester som finns, varför vi valt dem och vad körningarna visade. Den kopplar acceptanskriterier (A#) och kvalitetskrav (K#) i [specs/](specs/) till tester.

## Så väljer vi tester

- Varje A# och K# får minst en rad i spårbarhetstabellen, även om kontrollen bara är planerad eller manuell. Då syns luckorna.
- Vi tar med happy paths, error paths (felaktig indata och misslyckade operationer) och gränsfall utifrån reglerna, till exempel text med bara mellanslag eller inmatning vid och över en längdgräns.
- När ett fel hittas beskriver vi förväntat och faktiskt resultat, rättar och lägger till ett regressionstest som fångar felet om det återkommer.

## Kod som byggdes före specen (`frontend-v2`)

Frontenden på `frontend-v2` byggdes innan specen var klar, och den har redan egna tester. Där arbetar vi därför baklänges: vi börjar med koden och testerna som finns och kontrollerar dem mot specen. Vanligtvis går det tvärtom, från spec till test till kod. Beslutet står i [beslut.md](beslut.md).

**Specen gäller, inte koden.** Att ett test går igenom visar bara att koden gör det testet kontrollerar. Det visar inte att koden gör det specen kräver.

För varje A# som berör frontenden gör vi så här innan koden läggs in i `main`:

1. **Hitta testet.** Vilket befintligt test hör till kriteriet? Finns inget skriver vi ett nytt.
2. **Jämför med specen.** Kontrollerar testet samma utgångsläge, handling och förväntade resultat som kriteriet, även det som _inte_ ska ändras? Om inte rättar vi testet, inte specen.
3. **Rätta koden** om den gör något annat än specen säger.
4. **Pröva att testet kan misslyckas.** Ett test som skrivs efter koden kan råka alltid gå igenom. Vi ändrar koden tillfälligt så att den gör fel och kontrollerar att testet då misslyckas.
5. **Byt namn** så att testet börjar med id:t, till exempel `A2: …` eller `SF-A1: …`.
6. **Kör testet**, skriv in resultatet under [Resultat](#resultat) och ändra status till Genomförd.

Testerna på `frontend-v2` går mot mockar, alltså låtsasdata i stället för det riktiga API:t. De visar därför inte att frontend och backend fungerar ihop. Kriterier som handlar om lagring kontrolleras också med API-tester mot backend.

Om specen visar sig vara fel eller ofullständig ändrar vi inte specen i smyg för att den ska passa koden. Vi skriver en öppen fråga i specen och beslutar i teamet.

## Hur testerna körs

- **Backend:** `python -m pytest` från `backend/`.
- **Frontend:** `npm run test:run` från `frontend/`, när koden från `frontend-v2` är inlagd i `main`.

## Spårbarhet

Testnamn börjar med id:t, till exempel `test_a2_saknad_rubrik_avvisas` (pytest) eller `it("A2: avvisar ärende utan rubrik")` (Vitest). Specen säger vilket R ett A kontrollerar; den här tabellen säger vilket test som kontrollerar ett A.

Testerna vars namn börjar med `test_` är API-tester och körs på `main`. Övriga test med namn finns på `frontend-v2` och går mot mockar. De har inte körts eller jämförts med kriterierna ännu. Det görs enligt [Kod som byggdes före specen](#kod-som-byggdes-före-specen-frontend-v2), och då får de namn efter id:t. Deras A11–A16 gäller sökning och blir `SF-A#`. `–` i kolumnen Test betyder att inget test finns än, och `?` att teamet inte har bestämt ännu. Nivån är ett förslag tills avsnittet om testnivå är ifyllt.

| A#/K#  | R#           | Typ        | Nivå           | Test                                                                                                              | Status    | Senaste resultat     | Ansvarig |
| ------ | ------------ | ---------- | -------------- | ----------------------------------------------------------------------------------------------------------------- | --------- | -------------------- | -------- |
| A1     | R1           | Happy path | API, komponent | `test_a1_nytt_arende_far_status_nytt_och_syns_i_listan`, `A1: a valid case is saved with status Nytt and a created time, and shows in the list` | Genomförd | API: passerade 2026-11-02, komponent: passerade 2026-11-03 | Ruben |
| A2     | R2, R3, R12  | Error path | API, komponent | `A2: a case without a title is rejected with a clear message; still two cases` | Planerad  | Komponent: passerade 2026-11-03 | Ruben (komponent), Otto (API) |
| A3     | R2, R3, R12  | Gränsfall  | API, komponent | `A3: a title with only spaces counts as empty; still two cases` | Planerad  | Komponent: passerade 2026-11-03 | Ruben (komponent), Otto (API) |
| A4     | R3, R4, R12  | Error path | API, komponent | `A4: a category that is not allowed is rejected with a clear message; nothing saved` | Planerad  | Komponent: passerade 2026-11-03 | Ruben (komponent), Otto (API) |
| A5     | R5           | Happy path | API            | `test_a5_arende_finns_kvar_efter_omstart`                                                                         | Genomförd | API: passerade 2026-11-02 | Nathalie |
| A6     | R6           | Happy path | Komponent      | `A6: all three cases show with title, status, priority and created time` | Genomförd | Komponent: passerade 2026-11-03 | Ruben |
| A7     | R7           | Happy path | Komponent      | `A7: all fields of the chosen case are shown` | Genomförd | Komponent: passerade 2026-11-03 | Ruben |
| A8     | R5, R8       | Happy path | API, komponent | `A8: the status changes to Pågående and the other fields are unchanged` | Planerad  | Komponent: passerade 2026-11-03 | Ruben (komponent), Otto (API) |
| A9     | R9, R12      | Error path | API, komponent | `A9: an invalid status is rejected with a clear message and the status is still Nytt` | Planerad  | Komponent: passerade 2026-11-03 | Ruben (komponent), Otto (API) |
| A10    | R10, R12     | Error path | API, komponent | `test_a10_okant_arende_ger_svenskt_besked`, `A10: shows a clear message when the case does not exist` | Genomförd | API: passerade 2026-11-02, komponent: passerade 2026-11-03 | Ruben |
| A11    | R3, R4, R12  | Error path | API            | –                                                                                                                 | Planerad  | –                    | ?        |
| A12    | R6           | Happy path | Enhet          | `A12: the most recently created case comes first and the oldest last` | Genomförd | Enhet: passerade 2026-11-03 | Ruben |
| K1     | –            | –          | Manuell        | Manuell genomgång                                                                                                 | Planerad  | –                    | ?        |
| SF-A1  | SF-R1, SF-R7 | Happy path | Enhet          | `SF-A1: 'faktura' finds C3 and C1, with C3 first` | Genomförd | Enhet: passerade 2026-11-03 | Ruben |
| SF-A2  | SF-R1        | Happy path | Enhet          | `SF-A2: 'FAKTURA' gives the same result as 'faktura'` | Genomförd | Enhet: passerade 2026-11-03 | Ruben |
| SF-A3  | SF-R1        | Gränsfall  | Enhet          | `SF-A3: 'FÖR' finds only C1` | Genomförd | Enhet: passerade 2026-11-03 | Ruben |
| SF-A4  | SF-R1        | Happy path | Enhet          | `SF-A4: 'inloggningen', only in the description, finds only C2` | Genomförd | Enhet: passerade 2026-11-03 | Ruben |
| SF-A5  | SF-R1        | Happy path | Enhet          | `SF-A5: part of a word, 'faktur', finds C3 and C1` | Genomförd | Enhet: passerade 2026-11-03 | Ruben |
| SF-A6  | SF-R2        | Happy path | Enhet          | `SF-A6: status Nytt shows only C1, and Alla shows all three again` | Genomförd | Enhet: passerade 2026-11-03 | Ruben |
| SF-A7  | SF-R2        | Happy path | Enhet          | `SF-A7: kategori Teknik shows only C2` | Genomförd | Enhet: passerade 2026-11-03 | Ruben |
| SF-A8  | SF-R2        | Happy path | Enhet          | `SF-A8: prioritet Låg shows only C3` | Genomförd | Enhet: passerade 2026-11-03 | Ruben |
| SF-A9  | SF-R3        | Happy path | Enhet          | `SF-A9: 'faktura' and status Nytt together show only C1` | Genomförd | Enhet: passerade 2026-11-03 | Ruben |
| SF-A10 | SF-R4, SF-R8 | Gränsfall  | Komponent      | `SF-A10: 'xyz' gives 'Inga ärenden matchar'; clearing and searching again shows all three unchanged` | Genomförd | Komponent: passerade 2026-11-03 | Ruben |
| SF-A11 | SF-R5        | Gränsfall  | Enhet          | `SF-A11: only spaces shows all three, and '  faktura  ' is the same as 'faktura'` | Genomförd | Enhet: passerade 2026-11-03 | Ruben |
| SF-A12 | SF-R6        | Gränsfall  | Komponent      | `SF-A12: '<script>' is plain text: 'Inga ärenden matchar', and the app keeps working` | Genomförd | Komponent: passerade 2026-11-03 | Ruben |
| SF-A13 | SF-R9        | Happy path | Komponent      | `SF-A13: the list is unchanged while typing and is searched when Enter is pressed` | Genomförd | Komponent: passerade 2026-11-03 | Ruben |
| SF-A14 | SF-R10       | Gränsfall  | Komponent      | `SF-A14: the search field holds at most 100 characters` | Genomförd | Komponent: passerade 2026-11-03 | Ruben |

- **Typ:** happy path, error path eller gränsfall.
- **Nivå:** enhet, API, komponent eller manuell.
- **Status:** planerad eller genomförd.

## Testnivå och motivering

Nivån för varje kriterium står i kolumnen Nivå i tabellen ovan.

- **API (pytest):** regler och lagring kontrolleras i backend, där de finns. Testet visar att rätt ärende sparas och att inget sparas vid fel.
- **Komponent (Vitest):** det handläggaren ser, till exempel felmeddelanden och listans kolumner.
- **Enhet (Vitest):** sökning, filter och sortering. Snabba tester, så vi kan pröva många fall.
- **Manuell:** det som är svårt att automatisera, till exempel att allt går att göra med tangentbord (K1).

Vi testar inte genom hela gränssnittet. Kursen kräver det inte och det tar lång tid att bygga.

## Resultat

| Datum      | Commit                       | Kommando                           | Utfall   |
| ---------- | ---------------------------- | ---------------------------------- | -------- |
| 2026-10-30 | Ej committad, branch `specs` | `python -m pytest` från `backend/` | 1 passed |
| 2026-11-02 | `b5260e5`, branch `backend-steg-1` | `python -m pytest` från `backend/` | 3 passed |
| 2026-11-03 | ?, branch `frontend-v2` | `npm run check` från `frontend/` | Format, lint, typer och bygge gick igenom. 54 passed |
| 2026-11-03 | ?, branch `frontend-v2` | `python -m pytest` från `backend/` | 3 passed |

## Begränsningar

- Frontendtesterna går mot mockar. Inget automatiskt test visar att frontend och backend fungerar ihop.
- Mockarna följer besluten i [backenduppdraget](agentuppdrag/2026-11-02-backend-status-och-varden.md). Tills steg 2–4 där är klara svarar den riktiga backend annorlunda: statusändringen finns inte (appen visar "Not Found"), kategori och prioritet kontrolleras inte, och felmeddelandena kommer från Pydantic.
- Frontendens tester skrevs efter koden. Varje test i tabellen har jämförts med specen och setts misslyckas med en tillfällig felaktig ändring, se [frontenduppdraget](agentuppdrag/2026-11-03-frontend-mot-spec.md).
- A2–A4, A8, A9 och A11 väntar på API-tester i backend. K1 är en planerad manuell kontroll.
