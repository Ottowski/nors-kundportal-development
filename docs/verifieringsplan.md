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

A5 körs på `main`. Övriga test med namn finns på `frontend-v2` och går mot mockar. De har inte körts eller jämförts med kriterierna ännu. Det görs enligt [Kod som byggdes före specen](#kod-som-byggdes-före-specen-frontend-v2), och då får de namn efter id:t. Deras A11–A16 gäller sökning och blir `SF-A#`. `–` i kolumnen Test betyder att inget test finns än, och `?` att teamet inte har bestämt ännu. Nivån är ett förslag tills avsnittet om testnivå är ifyllt.

| A#/K#  | R#           | Typ        | Nivå           | Test                                                                                                              | Status    | Senaste resultat     | Ansvarig |
| ------ | ------------ | ---------- | -------------- | ----------------------------------------------------------------------------------------------------------------- | --------- | -------------------- | -------- |
| A1     | R1           | Happy path | API, komponent | `A1: creates a case with status Nytt`, `A1: Nytt ärende opens the form in the panel; new case is first and shown` | Planerad  | –                    | ?        |
| A2     | R2, R3, R12  | Error path | API, komponent | `A2: rejects missing title, nothing saved`                                                                        | Planerad  | –                    | ?        |
| A3     | R2, R3, R12  | Gränsfall  | API, komponent | `A3: title with only spaces counts as empty`                                                                      | Planerad  | –                    | ?        |
| A4     | R3, R4, R12  | Error path | API, komponent | `A4: shows backend field error and keeps input`                                                                   | Planerad  | –                    | ?        |
| A5     | R5           | Happy path | API            | `test_arende_finns_kvar_efter_omstart`                                                                            | Genomförd | Passerade 2026-10-30 | Nathalie |
| A6     | R6           | Happy path | Komponent      | `A6: list columns are title, status, priority and created`                                                        | Planerad  | –                    | ?        |
| A7     | R7           | Happy path | Komponent      | `A7: shows all fields of the case`, `A7: clicking a row opens details in the side panel, list stays visible`      | Planerad  | –                    | ?        |
| A8     | R5, R8       | Happy path | API, komponent | `A8: changes status, other fields unchanged`, `A8: status change in the panel is reflected by the list filter`    | Planerad  | –                    | ?        |
| A9     | R9, R12      | Error path | API, komponent | `A9: rejected status keeps the old status and shows a message`                                                    | Planerad  | –                    | ?        |
| A10    | R10, R12     | Error path | API, komponent | `A10: shows a clear message when the case does not exist`                                                         | Planerad  | –                    | ?        |
| A11    | R3, R4, R12  | Error path | API            | –                                                                                                                 | Planerad  | –                    | ?        |
| A12    | R6           | Happy path | Enhet          | `orders by skapad descending`                                                                                     | Planerad  | –                    | ?        |
| K1     | –            | –          | Manuell        | Manuell genomgång                                                                                                 | Planerad  | –                    | ?        |
| SF-A1  | SF-R1, SF-R7 | Happy path | Enhet          | `A11: finds cases by text`                                                                                        | Planerad  | –                    | ?        |
| SF-A2  | SF-R1        | Happy path | Enhet          | `A12: ignores upper/lower case`                                                                                   | Planerad  | –                    | ?        |
| SF-A3  | SF-R1        | Gränsfall  | Enhet          | `matches Swedish characters case-insensitively`                                                                   | Planerad  | –                    | ?        |
| SF-A4  | SF-R1        | Happy path | Enhet          | `searches description too (Q7 proposal)`                                                                          | Planerad  | –                    | ?        |
| SF-A5  | SF-R1        | Happy path | Enhet          | –                                                                                                                 | Planerad  | –                    | ?        |
| SF-A6  | SF-R2        | Happy path | Enhet          | `A13: filters by status`                                                                                          | Planerad  | –                    | ?        |
| SF-A7  | SF-R2        | Happy path | Enhet          | `filters by kategori`                                                                                             | Planerad  | –                    | ?        |
| SF-A8  | SF-R2        | Happy path | Enhet          | –                                                                                                                 | Planerad  | –                    | ?        |
| SF-A9  | SF-R3        | Happy path | Enhet          | `A14: combines search and filter with AND`                                                                        | Planerad  | –                    | ?        |
| SF-A10 | SF-R4, SF-R8 | Gränsfall  | Komponent      | `A15: returns empty list when nothing matches`, `R11.8: does not change the input`                                | Planerad  | –                    | ?        |
| SF-A11 | SF-R5        | Gränsfall  | Enhet          | `A16: spaces-only search shows all`, `trims search text`                                                          | Planerad  | –                    | ?        |
| SF-A12 | SF-R6        | Gränsfall  | Komponent      | `treats special characters as plain text`, `renders <script> search text as plain text, no crash`                 | Planerad  | –                    | ?        |
| SF-A13 | SF-R9        | Happy path | Komponent      | –                                                                                                                 | Planerad  | –                    | ?        |
| SF-A14 | SF-R10       | Gränsfall  | Komponent      | –                                                                                                                 | Planerad  | –                    | ?        |

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

## Begränsningar

- Frontendtesterna går mot mockar. Inget automatiskt test visar att frontend och backend fungerar ihop.
- Testerna från `frontend-v2` skrevs efter koden och har inte jämförts med specen ännu.
- Bara A5 är kört än. Övriga rader är planerade.
