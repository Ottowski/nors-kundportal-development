# Frontendfunktion (svensk version)

> Svensk översättning av [SKILL.md](SKILL.md). Claude Code läser bara `SKILL.md`; ändra båda filerna tillsammans.

Lägger till eller ändrar en frontendfunktion i `frontend/` för ett eller flera krav (R#/A#), test först, mot riktigt API eller MSW-mockar. Används när ett krav behöver gränssnitt, när en backend-endpoint har lagts till eller ändrats, eller när ett acceptanstest i frontend fallerar.

## När den används

- Ett krav i `../kundportal-sdd/specs/*.md` behöver arbete i gränssnittet.
- Backend lägger till eller ändrar en endpoint i `backend/app/routers/`.
- En öppen fråga (F#/Q#) stängs och ändrar värden eller beteende.

## Arbetsordning

1. **Läs källan.** Kravavsnittet (R#, A#), `backend/app/schemas/arende.py`, routern. Gissa aldrig fältnamn.
2. **Typer.** Uppdatera `src/types/arende.ts` så att den matchar backendschemat exakt.
3. **Mock.** Uppdatera `src/mocks/handlers.ts` så att den beter sig som backend: samma statuskoder, samma form på `detail`. För en endpoint som backend inte har än: lägg till den här och i Postman-mappen "Proposed".
4. **API-klient.** Lägg till anropet i `src/api/arendenApi.ts`. All `fetch` går genom `request()`.
5. **Test först.** Skriv testet som fallerar. Döp det efter kriteriet: `it("A9: rejected status keeps the old status", …)`.
6. **Komponent.** Få testet att gå igenom. Håll tillstånd lokalt; lyft till `App.tsx` bara när listan måste ändras.
7. **Postman.** Lägg till eller uppdatera anropet i `docs/api/kundportal.postman_collection.json` med `pm.test`-kontroller.
8. **Kontroll.** `cd frontend && npm run check`. Alla steg måste gå igenom.

> Se `docs/architecture-flow.sv.md` för dataflöde och felflöde.

## Viktiga regler

- Texten i gränssnittet är på svenska. Identifierare i koden följer backend (`rubrik`, `prioritet`).
- Varje asynkron vy har tillstånden laddar, tom, fel och klar.
- Visa backendens meddelanden via `ApiError`. Visa aldrig rå text från fetch eller HTTP.
- Uppdatera lokalt tillstånd från API-svaret (skapa, statusändring). Hämta inte om listan.
- Preliminära värden (F1/F2) finns bara i `src/constants/arende.ts`.
- Tester använder Testing Library-frågor via roll/etikett, inte CSS-klasser, utom `.badge` där texten upprepas.

## Bra och dåligt

```ts
// Bad: raw error, refetch, magic strings
catch (e) { setError(String(e)); load(); }
if (arende.status === "Avslutad") { … }   // typo, compiler does not see it

// Good: normalized error, local update, typed union
catch (e) { setError(e instanceof ApiError ? e.message : UNKNOWN_ERROR_MESSAGE); }
onChanged(await updateStatus(arende.id, "Avslutat"));   // ArendeStatus union
```

## Fallgropar

- **MSW `onUnhandledRequest: "error"`.** Ett test som anropar en endpoint utan handler fallerar tydligt. Lägg till handlern, mildra inte inställningen.
- **Mocktillstånd läcker mellan tester om det inte nollställs.** `src/test/setup.ts` anropar `db.reset()` efter varje test. Lägger du till nytt mocktillstånd: nollställ det där också.
- **Dubbla etiketter förstör `getByLabelText`.** Formuläret och filterraden hade båda "Kategori". Ge varje kontroll ett unikt tillgängligt namn ("Filtrera kategori").
- **Pydantic lägger till `Value error, ` före validatorns meddelande.** `toApiError` tar bort det. Behåll det när du ändrar feltolkningen.
- **FastAPI 422 `loc` slutar med fältnamnet.** Använd sista elementet, inte index 1; nästlade kroppar gör sökvägen längre.
- **Backend ignorerar okända query-parametrar.** `GET /arenden?status=X` returnerar alla ärenden i dag, så ett "lyckat" filteranrop bevisar inget förrän backend har byggt stödet.
- **Bara `--mode mock`.** MSW-workern får inte starta i ett vanligt bygge. Behåll den dynamiska importen bakom `import.meta.env.MODE === "mock"`.
