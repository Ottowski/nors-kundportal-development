# Agentuppdrag: statusöversikt i frontenden

- **Ansvarig:** Nathalie
- **Datum:** 2026-11-05
- **Agent och verktyg:** Claude Code (Opus 5.5) i VS Code, med skillen `verifiera-mot-spec`
- **PR:** [länk]

## Före

### Mål

Statusöversikten i [statusoversikt.md](../specs/statusoversikt.md) ska byggas och testas: SO-R1–SO-R5, SO-A1–SO-A6 och kvalitetskravet SO-K1. Översikten är en rad under rubriken "Alla ärenden" som visar antalet ärenden per status, till exempel Nytt 2, Pågående 1, Väntar på kund 0, Avslutat 1.

Specen är skriven och committad före koden. Här skrivs koden och testerna efter specen, inte tvärtom.

[A9-uppdraget](2026-11-04-a9-test.md#avvikelser-och-öppna-frågor) nämnde att dess tester inte visar att listan i App uppdateras efter en statusändring. Det finns redan ett test för det i `App.test.tsx` ("a status change in the panel is reflected by the list filter"). SO-A3 prövar samma sak för översikten.

### Kontext

- [CLAUDE.md](../../CLAUDE.md): regler och frontendens struktur.
- [statusoversikt.md](../specs/statusoversikt.md): hela specen. Den gäller, inte koden.
- R6 och statusarna i [kravspec.md](../specs/kravspec.md).
- `.claude/skills/verifiera-mot-spec/SKILL.md`, särskilt "Checklista för varje test". Skillen nämner bara A# och SF-A#, men checklistan gäller också SO-A#.
- `frontend/src/App.tsx` och `App.test.tsx`, `constants/arende.ts` (`STATUSAR`), `utils/filterArenden.ts` och dess test (mönster för en ren funktion), `components/StatusBadge.tsx` (stil), `components/ArendeDetail.test.tsx` (mönster för statusändring) och `src/mocks/handlers.ts` (bara läsas).

### Avgränsning

- **Får ändras:**
  - ny `frontend/src/utils/countByStatus.ts` och `countByStatus.test.ts`
  - ny `frontend/src/components/StatusOverview.tsx` och `StatusOverview.test.tsx`
  - `frontend/src/App.tsx`: import och en rad som visar översikten när listan är laddad
  - `frontend/src/App.test.tsx`: nya tester för SO-A3–SO-A6
  - `frontend/src/App.css`: nya regler för översikten, om det behövs
  - det här agentuppdraget
- **Får inte ändras:** befintliga tester, övrig produktionskod i `frontend/src/` (till exempel `SearchFilterBar.tsx`, `ArendeList.tsx`, `ArendeDetail.tsx`), mocken i `src/mocks/` och `src/test/setup.ts`, `backend/`, `docs/specs/`, `backend/.env` och `frontend/.env.local`. Inga nya beroenden.
- **Beteenden som inte får ändras:** listan, sökningen, filtren, formuläret och detaljvyn fungerar som förut. Översikten använder hela listan (`list.arenden`), inte den filtrerade (`visible`), enligt SO-R2.
- **Tillfälliga fel:** för att visa att ett test kan misslyckas behöver koden göra fel en kort stund. Fel i produktionskoden gör **jag** själv. Agenten föreslår exakt vilken ändring som ska prövas (fil, rad och ändring). Efteråt återställer jag ändringen direkt och kontrollerar med `git status` att inget ligger kvar. Fel som kan göras i själva testet, till exempel ett annat utgångsläge med `db.reset(...)`, får agenten göra.
- Om specen är oklar ändras den inte. Agenten listar det som en fråga, och jag beslutar.

### Faktiska behörigheter

Claude Code i VS Code på min dator. Agenten kan läsa och skriva filer i repot och köra skalkommandon, till exempel `npx vitest` och `npm run check` i `frontend/`.

`CLAUDE.md` förbjuder git-kommandon och åtkomst till `backend/.env` och `frontend/.env.local`. Verktyget stoppar inte det tekniskt, så den gränsen vilar på instruktionen. Jag kör alla git-kommandon själv, också `git status` och `git diff` för att kontrollera agentens ändringar.

Agenten planerar i Plan mode, där den inte kan ändra filer. Sedan arbetar den i läget där den frågar före varje ändring.

### Kontrollpunkter

Agenten stannar och väntar på mig:

1. Efter planen, innan någon fil ändras. Innan agenten börjar committar jag det här uppdraget, så att allt går att ångra.
2. Efter varje steg i planen (räknefunktionen, komponenten, App). Jag läser ändringen, kör testerna och committar innan nästa steg.
3. Innan en fil utanför listan "Får ändras" ändras.
4. När ett tillfälligt fel i produktionskoden behövs. Agenten beskriver ändringen, och jag gör den själv.
5. Om ett test inte kan bli grönt utan att mocken, specen eller befintliga tester ändras.
6. Innan arbetet rapporteras som klart, med de faktiska utskrifterna från testkörningarna.

### Klart när

- Varje SO-A1–SO-A6 och SO-K1 har minst ett test, och testnamnet börjar med id:t, till exempel `SO-A1: …`.
- Varje test har gåtts igenom med checklistan i skillen, med svar per punkt.
- Varje test kontrollerar utgångsläget innan handlingen, när specen anger ett.
- Varje test har setts bli **rött av rätt anledning** med ett tillfälligt fel: rätt `expect` misslyckas med väntat meddelande, inte en krasch av något annat. Minst:
  - **SO-A1:** rött när en status hoppas över eller räknas fel i `countByStatus.ts`.
  - **SO-A2:** rött när statusar med 0 ärenden inte visas.
  - **SO-A3 och SO-A4:** röda när översikten inte uppdateras efter en statusändring eller ett nytt ärende.
  - **SO-A5:** rött när `App.tsx` ger översikten `visible` i stället för `list.arenden`.
  - **SO-A6:** rött när översikten visas fast listan inte kunde hämtas.
  - **SO-K1:** rött när översikten saknar namnet "Antal ärenden per status", eller när statusnamn och siffra inte står ihop.
- Efter varje tillfälligt fel visar `git status` att inget ligger kvar.
- Befintliga tester är oförändrade och går igenom.
- `npm run check` i `frontend/` går igenom på min dator, och CI på PR:en är grön.
- `npm run dev:mock`: siffrorna stämmer med listan, ändras när en status ändras eller ett ärende skapas, och ändras inte av sökning och filter.
- Agentens slutrapport säger vad testerna **inte** visar.
- Jag har själv kört kontrollerna ovan och skrivit in resultaten under Verifiering.

### Instruktionen

> Du ska undersöka och planera ett avgränsat uppdrag i Kundserviceportalen NORS, på branchen statusoversikt. Ändra inga filer i det här steget.
>
> ## Läs först
>
> - docs/agentuppdrag/2026-11-05-statusoversikt.md: mål, avgränsning, kontrollpunkter och klart när
> - docs/specs/statusoversikt.md: hela specen
> - .claude/skills/verifiera-mot-spec/SKILL.md: checklistan gäller också SO-A#
> - frontend/src/App.tsx och App.test.tsx (där översikten ska visas och testas), constants/arende.ts (statusarna och deras ordning), utils/filterArenden.ts med test (mönster för en ren funktion och dess test), components/StatusBadge.tsx (hur status visas i dag), components/ArendeDetail.test.tsx (mönster för hur vi testar en statusändring och kontrollerar utgångsläget) och src/mocks/handlers.ts (hur testdatan sätts med db.reset, bara läsas)
>
> ## Avgränsning
>
> Bara filerna under "Får ändras" i agentuppdraget. Inte mocken, befintliga tester, backend eller specen. Inga nya beroenden.
>
> ## Det här vill jag ha tillbaka
>
> 1. En plan i små steg: räknefunktionen, komponenten, sedan App. Planen ska visa var du stannar och väntar på mig efter varje steg.
> 2. Minst två sätt att bygga räknefunktionen och komponenten, med för- och nackdelar. Märk ditt eget förslag som förslag. Att översikten räknar alla ärenden och inte bara de som syns är redan beslutat (SO-Q1) och ska inte väljas om.
> 3. För varje SO-A och SO-K1: vilket test, i vilken fil, vilka gränsfall testet prövar (till exempel inga ärenden, en status med noll ärenden eller alla ärenden med samma status), hur utgångsläget kontrolleras, vilket tillfälligt fel som ska göra testet rött, och vilket felmeddelande vi väntar oss då, så att vi ser att det blir rött av rätt anledning. Fel i produktionskoden gör jag själv, så beskriv dem exakt (fil, rad och ändring).
> 4. Vilka filer du ändrar, och vad du inte rör.
> 5. Vilka antaganden du gör och vad du behöver fråga mig om. Om något i specen är oklart: fråga, ändra inte specen. Säg till om ett befintligt test riskerar att bli rött, till exempel för att ett statusnamn nu syns två gånger på sidan, eller om testdatan inte räcker för att pröva specen.
>
> Stanna sedan och vänta tills jag har godkänt planen. Ändra inga filer förrän jag har sagt ja. Kör inga git-kommandon. När du är klar ska din rapport innehålla de faktiska utskrifterna från testkörningarna och vad testerna inte visar.

## Efter

### Plan och mitt beslut

[Agentens plan, och om den godkändes, ändrades eller stoppades.]

### Granskning

- **Granskad av:** [namn]
- **Vad jag hittade:**
- **Arbete utanför uppdraget som togs bort:**
- **Accepterat, ändrat eller avvisat, och varför:**

### Verifiering

[Kommandon som kördes och vad de faktiskt visade. Agentens egen bedömning räcker inte.]

| Kommando | Resultat | Datum |
| -------- | -------- | ----- |
|          |          |       |

### Avvikelser och öppna frågor

[Vad som återstår eller behöver undersökas.]
