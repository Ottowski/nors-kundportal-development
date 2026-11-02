# Handlingsplan: rätta frontend-v2 mot specen

Det här är punkt 3 i förslaget på ordning: rätta frontend-v2 mot specen, köra testerna och merga till main.

Planen har sju uppgifter. Gör dem i ordning och en i taget. Varje uppgift har fem delar:

- **Vad:** vad uppgiften gäller.
- **Varför:** vilket krav i uppgiften eller vilket av teamets beslut den uppfyller.
- **Branch:** vilken branch ni skapar för uppgiften.
- **Gör så här:** stegen, i ordning.
- **Kontroll:** hur ni ser att uppgiften är rätt gjord. Gå inte vidare förrän kontrollen går igenom.

---

## Så gör ni med branchar

Varje uppgift som ändrar något får en egen branch från `frontend-v2`. Gör så här varje gång:

1. **Hämta det senaste.** Byt till `frontend-v2` och hämta (pull) de senaste ändringarna.
2. **Skapa en ny branch** från `frontend-v2` med namnet som står under uppgiften.
3. **Gör uppgiften** på den nya branchen.
4. **Öppna en PR till `frontend-v2`**, inte till main.
5. **Låt någon annan granska.** Någon annan i teamet granskar och godkänner.
6. **Merga in i `frontend-v2`.**
7. **Börja först sedan på nästa uppgift**, och börja igen från steg 1.

Varför ordningen spelar roll: uppgifterna bygger på varandra. Uppgift 5 behöver till exempel att redigeringen redan är borttagen i uppgift 4. Skapar ni nästa branch innan den förra är mergad saknas ändringarna, och det blir krockar.

Allt kommer till main samtidigt, i uppgift 7.

---

## Regler som gäller hela tiden

Läs dem innan ni börjar och gå tillbaka till dem när ni är osäkra.

1. **Specen gäller, inte koden.** Gör koden något annat än [kravspec.md](docs/specs/kravspec.md) eller [sok-filter.md](docs/specs/sok-filter.md) säger, rättar ni koden. Är specen fel skriver ni en öppen fråga (Q#) i specen och beslutar i teamet. Ändra den inte i smyg. Beslutet står i [beslut.md](docs/beslut.md).
2. **Bara status får ändras på ett ärende.** All redigering ska bort (kravspec.md, "Ingår inte").
3. **Ett test som går igenom räcker inte.** Testet ska kontrollera det som acceptanskriteriet säger, även det som *inte* ska ändras.
4. **Körresultaten gäller.** Att AI säger att något fungerar räcker inte. Ni kör testerna själva och skriver in resultatet ([ai-arbetssatt.md](docs/ai-arbetssatt.md)).
5. **Ingen kod kommer in i main utan granskning.** Någon annan i teamet granskar PR:en (beslut.md, vecka 4).
6. **Testnamn börjar med id:t**, till exempel `A2: …` eller `SF-A1: …`.
7. **En ny branch från `frontend-v2` för varje uppgift**, enligt "Så gör ni med branchar" ovan.

### Kontroll mot kursens uppgift

Gå igenom listan efter varje uppgift. Den kommer från [uppdrag.md](docs/uppdrag.md).

- [ ] Lösningen kan fortfarande registrera, lista, visa detaljer och ändra status.
- [ ] Felaktig inmatning ger ett begripligt besked på svenska.
- [ ] Testerna täcker både happy paths och error paths, och relevanta gränsfall.
- [ ] Det går att se vad AI gjorde och vad vi själva beslutade och kontrollerade.
- [ ] Verifieringsplanen visar faktiska körresultat, inte bara planerade.

---

## Uppgift 1: Kom överens med Otto om statusändringen

**Vad:** Bestäm tillsammans med backend hur anropet för att ändra status ska se ut.

**Varför:** Kursen kräver att status kan ändras (R8). Frontenden ändrar status mot en mock som backend inte har än. Om frontend och backend inte använder samma anrop fungerar A8 och A9 bara mot mocken och inte på riktigt.

**Branch:** `api-statusandring`, för steg 3. Samtalet med Otto behöver ingen branch.

**Gör så här:**

1. Visa Otto hur mocken gör i dag, i `frontend/src/mocks/handlers.ts`:
   - URL: `POST /arenden/{id}/status`
   - Det som skickas: `{ "status": "Pågående" }`
   - Svaret när det lyckas: hela ärendet med den nya statusen
   - Svaret vid ogiltig status: 422 med ett fel på fältet `status`
   - Svaret när ärendet saknas: 404
2. Bestäm om backend gör likadant. Om inte, bestäm vad som gäller. Då ändrar ni mocken i uppgift 5.
3. Skriv in det ni kom överens om i `docs/api/README.md`.

**Kontroll:**

- [ ] Ni och Otto har bestämt samma URL, samma JSON och samma felsvar.
- [ ] Det står i `docs/api/README.md`.

---

## Uppgift 2: Se hur läget är, utan att ändra något

**Vad:** Kör alla kontroller på `frontend-v2` innan ni ändrar något.

**Varför:** Då vet ni vad som fungerade från början. Går något sönder senare ser ni att det var er ändring som gjorde det.

**Branch:** ingen. Ni ändrar inget, så ni står kvar på `frontend-v2`.

**Gör så här:**

1. Byt till branchen `frontend-v2` och hämta det senaste.
2. Öppna en terminal i `frontend/` och kör `npm install`.
3. Kör `npm run check`. Kommandot kör formatering, lint, TypeScript, alla tester och bygget.
4. Skriv ner resultatet: hur många tester som gick igenom och om något misslyckades.

**Kontroll:**

- [ ] Ni har resultatet nedskrivet med datum, till exempel "58 passed, 2026-11-02".
- [ ] Ni vet om något redan var trasigt innan ni började.

---

## Uppgift 3: Skriv agentuppdraget innan agenten börjar

**Vad:** Skapa filen `docs/agentuppdrag/2026-11-02-frontend-v2-mot-spec.md` från [mallen](docs/mallar/agentuppdrag.md). Fyll bara i delen **Före**.

**Varför:** Kursen vill se hur ni styr AI och vilka beslut ni själva fattar. Agentuppdraget visar det. Uppdraget om dokumentationen finns redan, men ni har inget agentuppdrag för kod än.

**Branch:** `agentuppdrag-frontend-v2`.

**Gör så här:** fyll i varje rubrik i mallen.

1. **Ansvarig, datum och agent:** ert namn, 2026-11-02 och Claude Code.
2. **Mål:**
   - Frontenden följer A1–A4 och A6–A12 i kravspec.md och SF-A1–SF-A14 i sok-filter.md.
   - Redigeringen är borttagen.
   - Testerna heter efter sitt id.
3. **Kontext:** kravspec.md, sok-filter.md, verifieringsplan.md (avsnittet "Kod som byggdes före specen"), beslut.md och det anrop ni kom överens om i uppgift 1.
4. **Får ändras:** `frontend/`, `docs/verifieringsplan.md` och agentuppdraget.
5. **Får inte ändras:** `backend/` och specarna. Agenten får inte heller köra git-kommandon.
6. **Faktiska behörigheter:** agenten kan läsa och skriva filer och köra kommandon. Git förbjuds bara i `CLAUDE.md`; verktyget stoppar det inte. Ni sköter git själva.
7. **Kontrollpunkter:** agenten stannar efter varje uppgift (4, 5, 6 och 7) och väntar tills ni har granskat.
8. **Klart när:** `npm run check` går igenom och varje A# och SF-A# har ett test med rätt namn.
9. **Instruktionen:** klistra in exakt det ni skriver till agenten.

**Kontroll:**

- [ ] Alla rubriker under **Före** är ifyllda. Inga `?` och inga `[ ]` finns kvar.
- [ ] Målet nämner vilka A# och SF-A# som ingår.

---

## Uppgift 4: Ta bort redigeringen

**Vad:** Ta bort all kod som låter handläggaren redigera rubrik, beskrivning, kategori eller prioritet.

**Varför:** Specen säger att bara status får ändras ("Ingår inte" i kravspec.md). Teamet har bestämt att redigeringen tas bort (beslut.md, 2026-10-30). Backend har heller inget API för den.

**Branch:** `ta-bort-redigering`.

**Gör så här:**

1. Ta bort `frontend/src/constants/features.ts` och allt som använder `isEditEnabled`.
2. Ta bort PUT-handlern (`http.put(...)`) i `frontend/src/mocks/handlers.ts`.
3. Ta bort funktionen för redigering i `frontend/src/api/arendenApi.ts`.
4. Ta bort edit-läget i `ArendeForm.tsx`, alltså "Spara ändringar" och "Spara som nytt ärende".
5. Ta bort knappen Redigera i `ArendeDetail.tsx` och redigeringsikonen i listan i `App.tsx`.
6. Ta bort testerna för redigering:
   - `App.disabledFeatures.test.tsx`
   - `describe("ArendeForm – edit …")` i `ArendeForm.test.tsx`
   - `describe("arendenApi proposed editing …")` i `arendenApi.test.ts`
   - `edit in the panel…`, `edit icon in a row…` och `Redigera passes…`
7. Ändra kommentaren i `frontend/src/constants/arende.ts`. Kategorierna och prioriteterna är inte längre ett förslag; de är beslutade i kravspec.md (Q1 och Q2).
8. Kör `npm run check`.

**Kontroll:**

- [ ] Söker du efter `isEditEnabled`, `Redigera` och `http.put` i `frontend/src` får du inga träffar.
- [ ] `npm run check` går igenom.
- [ ] Det går fortfarande att ändra status i appen (`npm run dev:mock`).
- [ ] Inga andra filer har ändrats än de som gäller redigeringen.

---

## Uppgift 5: Kontrollera kärnflödet, ett acceptanskriterium i taget

**Vad:** Gå igenom varje A# i kravspec.md som berör frontenden och se till att den har ett test som kontrollerar rätt sak.

**Varför:** Kursen kräver automatiserade tester mot acceptanskriterierna, med både happy paths och error paths. Testerna på frontend-v2 skrevs före specen, så de kan kontrollera fel sak.

**Branch:** `karnflode-mot-spec`.

**Gör så här för varje A#.** Det här är de sex stegen ur [verifieringsplan.md](docs/verifieringsplan.md).

1. **Hitta testet.** Vilket test hör till kriteriet? Finns inget, skriv ett nytt.
2. **Jämför med specen.** Läs utgångsläget, handlingen och det förväntade resultatet i kravspec.md. Kontrollerar testet alla tre, även det som inte ska ändras? Om inte, rätta testet.
3. **Rätta koden** om den gör något annat än specen säger.
4. **Pröva att testet kan misslyckas.** Ändra koden tillfälligt så att den gör fel. Kör testet och se att det misslyckas. Ändra sedan tillbaka koden.
5. **Byt namn** så att testet börjar med id:t, till exempel `A2: …`.
6. **Kör testet** och skriv ner resultatet.

**Ordning:** en komponent i taget, så att varje granskning blir liten.

**5a. Formuläret** (`ArendeForm.test.tsx`)

| A#  | Testet ska visa                                                                                      | Finns test? |
| --- | ---------------------------------------------------------------------------------------------------- | ----------- |
| A1  | Ett giltigt ärende sparas med status *Nytt* och en skapad-tid, och det syns i listan                  | Ja          |
| A2  | Ärendet avvisas om rubriken saknas och ett begripligt besked visas. Det finns fortfarande två ärenden | Ja          |
| A3  | Samma som A2, men rubriken består bara av mellanslag                                                   | Ja          |
| A4  | En otillåten kategori avvisas med ett begripligt besked, och inget ärende sparas                      | Ja          |
| A11 | En otillåten prioritet avvisas med ett begripligt besked, och inget ärende sparas                     | **Nej, skriv nytt** |

Tänk på detta: A2 och A3 säger "Det finns fortfarande två ärenden". Testet ska alltså börja med två ärenden och kontrollera att det fortfarande är två efteråt.

**5b. Listan** (`App.test.tsx` och `filterArenden.test.ts`)

| A#  | Testet ska visa                                                 | Finns test?                                       |
| --- | --------------------------------------------------------------- | ------------------------------------------------- |
| A6  | Tre ärenden visas med rubrik, status, prioritet och skapad-tid  | Ja                                                |
| A12 | Det nyaste ärendet visas först och det äldsta sist              | Ja, men det heter `orders by skapad descending`, så byt namn |

**5c. Detaljvyn** (`ArendeDetail.test.tsx`)

| A#  | Testet ska visa                                                                     | Finns test? |
| --- | ----------------------------------------------------------------------------------- | ----------- |
| A7  | Alla fält visas för det valda ärendet                                                | Ja          |
| A8  | Status ändras till *Pågående* och övriga fält är oförändrade                         | Ja          |
| A9  | En ogiltig status avvisas med ett begripligt besked, och status är fortfarande *Nytt* | Ja          |
| A10 | Ett ärende som inte finns ger ett begripligt besked                                   | Ja          |

Tänk på detta:

- Kontrollera att mocken för A8 och A9 svarar som ni kom överens med Otto om i uppgift 1.
- A8 kräver också att statusen finns kvar efter omstart. Det kan frontendtestet inte visa. Den delen prövas i backend (punkt 2).

**Kontroll efter 5a, 5b och 5c:**

- [ ] Varje A# i tabellerna har ett test som börjar med id:t.
- [ ] Varje test kontrollerar utgångsläget, handlingen och det förväntade resultatet i specen.
- [ ] Varje test har misslyckats en gång när koden tillfälligt gjorde fel.
- [ ] Felmeddelandena är på svenska och innehåller inga tekniska fel (R12).
- [ ] `npm run check` går igenom.

---

## Uppgift 6: Kontrollera sökning och filtrering

**Vad:** Samma sex steg som i uppgift 5, men för SF-A1–SF-A14 i [sok-filter.md](docs/specs/sok-filter.md).

**Varför:** Kursen kräver en kompletterande funktion som är specificerad och testad. Ni har valt sökning och filtrering. Testerna heter i dag A11–A16, och de namnen krockar med kärnspecens A11 och A12.

**Branch:** `sok-filter-mot-spec`.

**Gör så här:**

1. Byt namn på sökningens tester till SF-A#. Använd kolumnen Test i verifieringsplanens tabell för att se vilket test som hör till vilket id, till exempel `A11: finds cases by text` → `SF-A1: …`.
2. Gå igenom de sex stegen från uppgift 5 för varje SF-A#.
3. Skriv nya tester för de SF-A# som saknar test: **SF-A5, SF-A8, SF-A13 och SF-A14**.
4. Kör `npm run check`.

**Kontroll:**

- [ ] Inget test i `frontend/src` heter längre `A13`–`A16`. `A11` och `A12` används bara för kärnspecens kriterier.
- [ ] Varje SF-A1–SF-A14 har ett test som börjar med id:t.
- [ ] `npm run check` går igenom.

---

## Uppgift 7: Dokumentera, granska och merga

**Vad:** Skriv in resultaten, låt någon annan granska och lägg in koden i main.

**Varför:** Kursen kräver att verifieringsplanen visar faktiska körresultat och att varje students bidrag syns. Teamet har bestämt att ingen kod kommer in i main utan granskning.

**Branch:** `dokumentera-resultat` för steg 1–3, med PR till `frontend-v2` som vanligt. PR:en till main i steg 4 öppnar ni från `frontend-v2`.

**Gör så här:**

1. Uppdatera [verifieringsplan.md](docs/verifieringsplan.md):
   - kolumnen **Test:** de nya testnamnen
   - kolumnen **Status:** *Genomförd* för de tester som har körts
   - kolumnen **Senaste resultat:** till exempel "Passerade 2026-11-05"
   - kolumnen **Ansvarig:** vem som gjorde kontrollen
   - tabellen **Resultat:** datum, commit, kommando och utfall
   - avsnittet **Begränsningar:** att frontendtesterna fortfarande går mot mockar
2. Fyll i delen **Efter** i agentuppdraget: agentens plan, vem som granskade, vad ni hittade, vad som togs bort och de kommandon ni själva körde.
3. Committa och pusha. Git gör ni själva, inte AI.
4. Öppna en PR till main med PR-mallen och länka agentuppdraget.
5. Någon annan i teamet granskar och godkänner. Granskaren kontrollerar att ändringarna följer specen och att testerna går igenom.
6. Merga.

**Kontroll:**

- [ ] Verifieringsplanen har inga `?` för frontendens A# och SF-A#.
- [ ] Agentuppdraget har inga `?` under **Efter**.
- [ ] PR:en är granskad av någon annan än den som skrev koden.
- [ ] `npm run check` går igenom på main efter mergen.
- [ ] Gå igenom "Kontroll mot kursens uppgift" överst en sista gång.

---

## Vad ni gör i dag

1. **Uppgift 1:** prata med Otto om statusändringen.
2. **Uppgift 2:** kör `npm run check` och skriv ner resultatet.
3. **Uppgift 3:** skriv agentuppdraget, delen Före.

De här uppgifterna ändrar ingen kod. Sedan kan agenten börja med uppgift 4.

## Vad planen inte täcker

Det här görs i andra punkter:

- Backend för statusändring och tillåtna värden (punkt 2).
- Test av hela flödet mot riktig backend och tangentbordskontrollen K1 (punkt 4).
