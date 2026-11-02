# Agentuppdrag: Backend – statusändring och tillåtna värden

- **Ansvarig:** ?
- **Datum:** 2026-11-02
- **Agent och verktyg:** Claude Code (Claude Opus 5.5) i VS Code
- **PR:** ?

## Före

### Mål

Backend ska uppfylla kravspecen på tre punkter, utan nya funktioner:

1. **Statusändring:** R8 och R9, som prövas av A8 och A9. A8 prövar också R5: statusen finns kvar efter omstart.
2. **Tillåtna värden för kategori och prioritet:** R4, som prövas av A4 och A11.
3. **API-tester med pytest** för A1–A4 och A8–A11. Testnamnen börjar med id:t (`test_a1_...`, `test_a11_...`). Felfallen prövar också R12: beskedet är på svenska och innehåller ingen teknisk text.

A5 ska fortsätta gå igenom.

### Kontext

- [CLAUDE.md](../../CLAUDE.md): regler och lagren i backend.
- [kravspec.md](../specs/kravspec.md): "Ett ärende ska innehålla", R1–R12 och A1–A12.
- [spec-driven-dev.md](../specs/spec-driven-dev.md), [verifieringsplan.md](../verifieringsplan.md) och [beslut.md](../beslut.md).
- `backend/app/` och `backend/tests/test_omstart.py`.
- Frontendens kontrakt för statusändringen, bara för läsning: `frontend/src/api/arendenApi.ts`, `frontend/src/api/apiError.ts` och `frontend/src/mocks/handlers.ts` på `frontend-v2`. Samma anrop finns i mappen "Proposed" i `docs/api/kundportal.postman_collection.json`.

Kontraktet: `POST /arenden/{id}/status` med `{"status": "<värde>"}`. Svaret är 200 med hela ärendet, 404 med `{"detail": "Ärendet hittades inte"}` eller 422 i FastAPIs format, där `loc` slutar med `status` och `msg` är svensk text.

### Avgränsning

- **Får ändras:** `backend/` (kod, tester och `requirements.txt`), exemplet på `POST /arenden` i `README.md` och raderna för A1–A5 och A8–A11 i `docs/verifieringsplan.md`.
- **Får inte ändras:** `frontend/`, `docs/specs/`, övriga delar av `docs/` (även `docs/api/`), frontendens kontrakt för statusändringen, `backend/.env`, `frontend/.env.local` och databasen `backend/app/data/nors.db`. Inga tester får skriva i den databasen. Inga nya funktioner, till exempel redigering av andra fält, radering eller filtrering i backend.
- **Inte beslutat:** om resultattabellen och avsnittet Begränsningar i `docs/verifieringsplan.md` också får ändras.
- Om specen är oklar eller verkar fel ändras den inte. Agenten listar det som en fråga, och teamet beslutar.

### Faktiska behörigheter

Claude Code i VS Code, i auto-läge. Under planeringen 2026-11-02 kunde agenten:

- läsa och skriva filer i repot och köra skalkommandon,
- köra `python -m pytest` med `backend/.venv` (Python 3.12, FastAPI 0.162, Pydantic 2.14, pytest 9.2; httpx är inte installerat),
- starta uvicorn på lokala portar mot en temporär databas utanför repot.

Agentens skalkommandon körs i Claude Codes sandlåda. Där varierade serverstarten:

- **Vid de första körningarna:** 27–38 s per start, så A5 gick inte igenom med gränsen 15 s.
- **Vid körningarna i steg 1:** under 1 s per start.

I en vanlig terminal på samma dator tog A5 4,1 s för två starter. Varför starterna ibland var långsamma är inte utrett.

`CLAUDE.md` förbjuder git-kommandon och åtkomst till `backend/.env` och `frontend/.env.local`. Det är inte prövat om verktyget stoppar dem tekniskt, så den gränsen vilar på instruktionen. Att installera paket kräver nätverk och ändrar `.venv`; det är inte heller prövat. Under planeringen begränsade instruktionen agenten till att läsa och skriva det här utkastet.

### Kontrollpunkter

Agenten stannar och väntar på teamet:

1. Efter planen, innan någon kod skrivs.
2. Innan ett nytt beroende läggs till i `requirements.txt` eller installeras i `.venv`.
3. Efter varje steg i planen, med testutfallet, så att steget kan granskas för sig. Teamet kör också `python -m pytest` i en vanlig terminal innan nästa steg.
4. Om ett test inte kan gå igenom utan att `frontend/`, specen eller kontraktet ändras.
5. Om A5 misslyckas av något annat skäl än uppdragets ändringar, till exempel för att servern startar långsamt.

### Klart när

- `python -m pytest` från `backend/` går igenom, med minst ett test per A1, A2, A3, A4, A8, A9, A10 och A11, och A5 går fortfarande igenom.
- Testnamnen börjar med id:t.
- Varje nytt test har setts misslyckas, före koden eller med en tillfällig ändring.
- Felfallen kontrollerar att beskedet är på svenska och saknar teknisk text, till exempel engelska texter från Pydantic, prefixet "Value error" och Python-listor.
- Inget test skriver i `backend/app/data/nors.db`.
- README:s exempel använder tillåtna värden.
- `docs/verifieringsplan.md` visar testnamnen och resultatet för A1–A5 och A8–A11.
- Teamet har granskat ändringarna. Agenten kör inga git-kommandon.

### Instruktionen

> Du ska undersöka och planera ett avgränsat backenduppdrag i Kundserviceportalen NORS. Ändra ingen kod i det här steget.
>
> ## Mål
> Ta fram en plan för att backend ska uppfylla kravspecen på tre punkter:
> 1. Statusändring: R8 och R9, som prövas av A8 och A9.
> 2. Tillåtna värden för kategori och prioritet: R4, som prövas av A4 och A11.
> 3. API-tester med pytest för A1–A4 och A8–A11. Testnamnen börjar med id:t (test_a1_..., test_a11_...). Felfallen ska också pröva R12: beskedet är på svenska och innehåller ingen teknisk text.
>
> Uppdraget som planeras är klart när `python -m pytest` från backend/ går igenom med minst ett test per A# ovan, felfallen ger svenska besked utan teknisk text och docs/verifieringsplan.md visar resultatet.
>
> ## Läs först
> - CLAUDE.md: regler (inga git-kommandon, inga hemliga filer) och lagren i backend
> - docs/specs/kravspec.md: "Ett ärende ska innehålla", R1–R12 och A1–A12
> - docs/specs/spec-driven-dev.md och docs/mallar/agentuppdrag.md
> - docs/verifieringsplan.md och docs/beslut.md
> - backend/app/ och backend/tests/test_omstart.py
>
> ## Det här vet vi redan
> Kontrollera varje punkt i koden. Säg till om något inte stämmer.
> - Backend har POST /arenden, GET /arenden och GET /arenden/{id}. Det finns ingen endpoint för att ändra status, och repositoryts kontrakt saknar en metod för det, både i minnes- och SQLite-versionen.
> - TILLATNA_KATEGORIER och TILLATNA_PRIORITETER i backend/app/schemas/arende.py är tomma, så backend godtar i dag vilket värde som helst.
> - Frontenden på branchen frontend-v2 anropar redan statusändringen så här, och mockarna där följer samma kontrakt:
>   - POST /arenden/{id}/status med body {"status": "<värde>"}
>   - 200 med hela det uppdaterade ärendet
>   - 404 med {"detail": "Ärendet hittades inte"}, samma text som GET /arenden/{id} redan ger
>   - 422 i FastAPIs format, där loc slutar med "status" och msg är svensk text, till exempel "Ogiltig status"
>   Frontenden visar msg-texten vid fältet och tar bort Pydantics prefix "Value error, ".
> - Pydantics egna felmeddelanden är på engelska, till exempel "Field required". Det krockar med R12.
> - Felmeddelandet för ogiltig kategori och prioritet skriver ut en Python-lista. Bedöm om det räknas som teknisk text enligt R12.
> - test_omstart.py (A5) skickar kategorin "Faktura", som inte finns bland specens värden. Testnamnet börjar inte heller med test_a5_.
> - README:s exempel använder "Support" och "Normal", som inte heller är tillåtna värden.
> - requirements.txt har fastapi, uvicorn[standard] och pytest. FastAPI:s TestClient kräver httpx, som inte finns där.
>
> ## Avgränsning
> - Undersök bara. Skapa eller ändra inga filer utom utkastet till agentuppdraget (punkt 4 nedan).
> - Uppdraget som planeras får omfatta backend/, backend/tests/, exemplet i README och raderna för A1–A5 och A8–A11 i docs/verifieringsplan.md. Det omfattar inte frontend/ och inte specarna.
> - Om specen är oklar eller verkar fel: ändra den inte, utan lista det som en fråga.
> - Föreslå inga nya funktioner.
>
> ## Det här vill jag ha tillbaka
> 1. Läget för statusändring, tillåtna värden och tester: vad som finns, vad som saknas och vilka risker du ser.
> 2. Beslut som teamet behöver ta, med för- och nackdelar. Märk ditt eget förslag som förslag. Minst de här:
>    - Följer vi frontendens kontrakt för statusändringen, eller finns det skäl att ändra det?
>    - Hur får vi svenska felmeddelanden utan teknisk text, även när Pydantic själv avvisar indata?
>    - Ska de tillåtna värdena också kontrolleras med CHECK i SQLite? Tänk på att CREATE TABLE IF NOT EXISTS inte ändrar en befintlig databasfil.
>    - Hur ska testerna köras: med TestClient (kräver httpx) eller mot en riktig server som i test_omstart.py? Hur får varje test en egen databas?
> 3. En plan i små steg som går att granska var för sig. Ange vilket A# varje steg gör grönt.
> 4. Ett utkast till agentuppdraget i docs/agentuppdrag/2026-11-02-backend-status-och-varden.md, enligt docs/mallar/agentuppdrag.md. Fyll bara i delen "Före": mål, kontext, avgränsning, faktiska behörigheter, kontrollpunkter och klart när. Klistra in den här prompten under "Instruktionen" och lämna "Efter" tom.
>
> Stanna sedan och vänta tills vi har godkänt planen. Skriv ingen kod förrän vi har sagt ja.

## Efter

### Plan och vårt beslut

Planen godkändes 2026-11-02 efter två ändringar från teamet. Testerna körs mot en riktig server i stället för med FastAPIs TestClient, och felhanteringen förenklades.

**Beslut**

- **Statusändring:** frontendens kontrakt följs som det är. FastAPI kontrollerar body före id, så ett okänt id med en ogiltig status ger 422, inte 404 som i mocken.
- **Svenska besked:** en felhanterare för `RequestValidationError` i en egen modul, registrerad med en rad i `main.py`. Den behåller formatet `{"detail": [{"type", "loc", "msg"}]}` och har tre regler:
  - prefixet "Value error, " tas bort,
  - "Field required" blir "Måste fyllas i",
  - övriga engelska texter blir "Ogiltigt värde".
- **Texter i schemat:** egna regler och deras texter står i schemat.
  - Tom rubrik eller beskrivning: "Får inte vara tomt eller bara mellanslag".
  - Kategori: "Ogiltig kategori. Välj Fakturering, Teknik, Leverans eller Övrigt."
  - Prioritet: "Ogiltig prioritet. Välj Låg, Medel eller Hög."
  - Status: "Ogiltig status".

  Kategori, prioritet och status ger sin egen text för alla felaktiga värden, även `null` och tal. De tillåtna värdena står i specens ordning, och kontrollen kan inte stängas av med en tom lista.
- **CHECK i SQLite:** ingen CHECK för kategori och prioritet; schemat är enda regeln. Status behåller sin CHECK.
- **Testerna:** de körs mot en riktig server som A5, utan nytt beroende. Varje test startar en egen server mot en egen databas i `tmp_path`. Det blir ett test per A#, med fallen samlade i testet. Gränsfall prövas bara där specen nämner dem: bara mellanslag (A3) och fel skiftläge (A4, A11). `STARTTID_SEKUNDER` höjs från 15 till 60, eftersom starten ibland tog upp till 38 s i agentens sandlåda (se Faktiska behörigheter). Gränsen kostar bara tid när servern inte svarar.
- **Verifieringsplanen:**
  - Testnamnen läggs in i kolumnen Test, och "API: passerade <datum>" i Senaste resultat.
  - Rader med en komponentdel behåller status Planerad tills den delen är klar. A5 och A11 blir Genomförd.
- **Branch:** förslaget är en egen branch från `main`. Teamet sköter git.

**Plan**

| Steg | Innehåll | Grönt |
| ---- | -------- | ----- |
| 1 | Testgrund: `kor_server` och `_anrop` flyttas från `test_omstart.py` till en gemensam fil i `tests/`. `_anrop` returnerar svaret även vid 4xx. Gränsen blir 60 s. A5-testet får namnet `test_a5_…` och kategorin "Fakturering". Nya tester för det som redan fungerar. Ingen produktionskod. | A1, A5, A10 (hämta) |
| 2 | Tester för A2 (rubrik saknas eller är tom) och A3 (bara mellanslag). Sedan felhanteraren. | A2, A3 |
| 3 | Tester för A4 och A11. Sedan de tillåtna värdena och texterna. README-exemplet får "Teknik" och "Medel". | A4, A11 |
| 4 | Tester för A8 (ändra status, starta om, övriga fält oförändrade), A9 (ogiltig status avvisas och den gamla statusen ligger kvar) och A10 (statusändring för ett okänt id ger 404). Sedan schemat, `update_status` i kontraktet och i båda repositoryn samtidigt, och endpointen. | A8, A9, A10 |
| 5 | Verifieringsplanen enligt besluten. | – |

Varje steg börjar med ett test som misslyckas, eller med en tillfällig ändring när koden redan fungerar. Agenten stannar efter varje steg.

**Frågor om specen.** Specen ändras inte. Tills teamet säger annat gäller förslagen:

- **R12:** Vilken del av API-svaret är beskedet? Förslag: `detail` när det är text, och varje `msg` när det är en lista.
- **A2:** Betyder "utan rubrik" att fältet saknas, att det är tomt, eller båda? Förslag: båda.
- **R2:** Kravet gäller också beskrivningen, men inget A# prövar den.
- **Inledande och avslutande mellanslag:** backend tar bort dem när rubrik och beskrivning sparas, men specen säger inget om det. Förslag: det testas inte förrän teamet har bestämt.

### Granskning

- **Granskad av:**
- **Vad vi hittade:**
- **Arbete utanför uppdraget som togs bort:**
- **Accepterat, ändrat eller avvisat, och varför:**

### Verifiering

Tabellen visar agentens egna körningar i sandlådan. Teamets körningar i en vanlig terminal läggs till vid varje kontrollpunkt.

| Kommando | Resultat | Datum |
| -------- | -------- | ----- |
| Steg 1: `python -m pytest -v` från `backend/` | 3 passed (A1, A5, A10) på 4,4 s | 2026-11-02 |
| Steg 1: A1 och A10 mot en ändrad kopia av backend (status Pågående i stället för Nytt, tom lista, engelskt besked vid 404) | Varje ändring gav ett misslyckat test | 2026-11-02 |

### Avvikelser och öppna frågor

Utanför uppdraget, att följa upp:

- **Mockarna:** `frontend/src/mocks/handlers.ts` kontrollerar inte kategori och prioritet, svarar "Field required" och ger 404 före 422 för statusändringen. Efter uppdraget skiljer de sig från backend.
- **Postman-samlingen:** samlingen i `docs/api/` hänvisar till den gamla specen och innehåller anrop som specen inte har. Mappen "Proposed" blir inaktuell när statusändringen finns.
- **Starlettes egna svar:** svaren vid fel adress eller metod ("Not Found", "Method Not Allowed") är på engelska. Frontenden når dem inte.
- **Lokala databasfiler:** de kan innehålla otillåtna värden. `nors.db` på datorn där planen gjordes har en rad med kategorin och prioriteten "test".
