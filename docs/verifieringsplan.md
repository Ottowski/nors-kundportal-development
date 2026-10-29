# Verifieringsplan

Planen visar vilka tester som finns, varför vi valt dem och vad körningarna visade. Den kopplar acceptanskriterier (A#) och kvalitetskrav (K#) i [specs/](specs/) till tester.

## Så väljer vi tester

- Varje A# och K# får minst en rad i spårbarhetstabellen, även om kontrollen bara är planerad eller manuell. Då syns luckorna.
- Vi tar med happy paths, error paths (felaktig indata och misslyckade operationer) och gränsfall utifrån reglerna, till exempel text med bara mellanslag eller inmatning vid och över en längdgräns.
- När ett fel hittas beskriver vi förväntat och faktiskt resultat, rättar och lägger till ett regressionstest som fångar felet om det återkommer.

## Hur testerna körs

_Ej ifyllt ännu. Det finns inga automatiserade tester på main._
_(Ange kommandon för backend och frontend, så att körningen kan upprepas.)_

## Spårbarhet

Testnamn börjar med id:t, till exempel `test_a2_saknad_rubrik_avvisas` (pytest) eller `it("A2: avvisar ärende utan rubrik")` (Vitest). Specen säger vilket R ett A kontrollerar; den här tabellen säger vilket test som kontrollerar ett A.

| A#/K#  | R#       | Typ          | Nivå  | Test                                 | Status     | Senaste resultat | Ansvarig |
| ------ | -------- | ------------ | ----- | ------------------------------------ | ---------- | ---------------- | -------- |
| _A2_   | _R2, R3_ | _Error path_ | _API_ | _`test_a2_saknad_rubrik_avvisas`_    | _Planerad_ | _–_              | _Namn_   |

- **Typ:** happy path, error path eller gränsfall.
- **Nivå:** enhet, API, komponent eller manuell.
- **Status:** planerad eller genomförd.

_Radera exempelraden ovan och lägg till riktiga rader här._

## Testnivå och motivering

_Ej ifyllt ännu._
_(Exempel: enhetstester, integrationstester eller manuella tester - och varför just den nivån räcker för projektet.)_

## Resultat

| Datum | Commit | Kommando | Utfall |
| ----- | ------ | -------- | ------ |
|       |        |          |        |

_Ej ifyllt ännu._

## Manuella kontroller

| Vad | Vem | Datum | Resultat |
| --- | --- | ----- | -------- |
|     |     |       |          |

_Ej ifyllt ännu._

## Begränsningar

_Ej ifyllt ännu._
_(Exempel: vad testas inte, och varför - t.ex. tidsbrist, saknad miljö eller medveten avgränsning.)_
