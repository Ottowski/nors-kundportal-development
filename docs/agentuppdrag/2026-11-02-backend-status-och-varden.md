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
- **Inte beslutat:** om resultattabellen och avsnittet Begränsningar i `docs/verifieringsplan.md`, och README:s stycke om testerna, också får ändras.
- Om specen är oklar eller verkar fel ändras den inte. Agenten listar det som en fråga, och teamet beslutar.

### Faktiska behörigheter

Claude Code i VS Code, i auto-läge. Under planeringen 2026-11-02 kunde agenten:

- läsa och skriva filer i repot och köra skalkommandon,
- köra `python -m pytest` med `backend/.venv` (Python 3.12, FastAPI 0.162, Pydantic 2.14, pytest 9.2; httpx är inte installerat),
- starta uvicorn på lokala portar mot en temporär databas utanför repot.

`CLAUDE.md` förbjuder git-kommandon och åtkomst till `backend/.env` och `frontend/.env.local`. Det är inte prövat om verktyget stoppar dem tekniskt, så den gränsen vilar på instruktionen. Att installera paket kräver nätverk och ändrar `.venv`; det är inte heller prövat. Under planeringen begränsade instruktionen agenten till att läsa och skriva det här utkastet.

### Kontrollpunkter

Agenten stannar och väntar på teamet:

1. Efter planen, innan någon kod skrivs.
2. Innan ett beroende läggs till i `requirements.txt` eller installeras i `.venv` (httpx).
3. Efter varje steg i planen, med testutfallet, så att steget kan granskas för sig.
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

### Granskning

- **Granskad av:**
- **Vad vi hittade:**
- **Arbete utanför uppdraget som togs bort:**
- **Accepterat, ändrat eller avvisat, och varför:**

### Verifiering

| Kommando | Resultat | Datum |
| -------- | -------- | ----- |
|          |          |       |

### Avvikelser och öppna frågor
