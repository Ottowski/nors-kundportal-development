Vecka 6: kursens förväntningar mot läget
Förväntningarna kommer från de raderade lektionsanteckningarna.

Förväntat vid slutet av vecka 6	Läge	Det som saknas
Det centrala flödet fungerar: registrera, spara, lista, detaljer och ändra status	Delvis	Backend kan registrera, lista och visa detaljer, och ärendena finns kvar efter omstart. Statusändring saknas i backend. Gränssnittet finns bara på frontend-v2, där statusändringen bara fungerar mot mockar. Statusändring fungerar alltså ingenstans på riktigt.
Avgränsat agentarbete med sparade instruktioner och mänsklig granskning	Delvis	Det finns ett agentuppdrag, om dokumentationen, men alla dess granskningsfält är ?. Det finns inget agentuppdrag för kod.
Automatiserade tester körda och resultaten dokumenterade	Delvis	Ett backendtest (A5) är kört och dokumenterat. De 58 frontendtesterna på frontend-v2 går mot mockar och är inte körda mot specen.
Varje students tekniska bidrag går att följa	Okänt	Jag kan inte se commits. Var och en behöver kontrollera att deras arbete syns i commits och PR:er.
Veckostatusen ligger efter. Vecka 6 är tom, trots att mycket gjordes: specen, återställningen av main, dokumentationsstrukturen och SQLite. Vecka 5 har också öppna punkter som nu är klara:

Avgränsningen står i kravspecen.
Motiveringen av teknikvalen står i beslut.md, men raden pekar på docs/teknikval.md, som inte finns.
Kursen ber er visa det faktiska läget varje vecka.

Min bedömning
Statusändringen i backend bör göras nu, inte i efterhand. Den är ett grundkrav i uppdraget och skulle ha varit klar vecka 6. Utan den går det inte att visa hela flödet eller pröva A8 och A9 mot riktig backend, och tangentbordskontrollen (K1) kan inte göras fullt ut.

Det är en liten ändring: en endpoint, en metod i repositoryt och tester. Den kan göras parallellt med att frontenden rättas. De tillåtna värdena för kategori och prioritet hör till samma backendarbete, och det är de som A4 och A11 prövar.

Förslag på ordning
Idag: fyll i veckostatus för vecka 6 och rätta de öppna punkterna från vecka 5.
Backend: statusändring, tillåtna värden och API-tester för A1–A4 och A8–A11. Det blir ett agentuppdrag, och Otto har backendrollen.
Frontend: agentuppdraget för att rätta frontend-v2 mot specen, köra testerna och merga till main.
Hela flödet: testa mot riktig backend, gör den manuella tangentbordskontrollen och uppdatera verifieringsplanen.
Vecka 8: låt någon utanför teamet köra lösningen enligt README, markera slutversionen och skriv de individuella redovisningarna.
Det här behöver jag från er
Kursens text för vecka 7 och 8: klistra in den, och slutdatumet för inlämningen. Utan den kan jag inte säga om ni ligger i fas för de veckorna.
Veckostatus: ska jag skriva ett utkast för vecka 6 och ordna de öppna punkterna från vecka 5?
Backend: håller ni med om att statusändringen tas nu, och vem gör den?