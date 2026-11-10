# Begränsningar, risker och fortsatt utveckling

Kursen kräver att gruppens underlag beskriver kända begränsningar, risker och förslag på fortsatt utveckling. Begränsningar i testningen står i [verifieringsplan.md](verifieringsplan.md).

## Kända begränsningar

### Medvetna val

Det här har vi valt bort, se "Ingår inte" i [kravspec.md](specs/kravspec.md).

- **Ingen inloggning.** Alla som kan öppna appen kan se och ändra alla ärenden.
- **Bara lokal körning.** Appen körs på den egna datorn och är inte gjord för flera användare samtidigt.
- **Ärenden kan inte raderas, och bara status kan ändras.** Ett felaktigt ärende ligger kvar.
- **Ingen historik.** Det syns inte vem som ändrade en status eller när.
- **Sökningen sker i webbläsaren** på listan som redan är hämtad (SF-Q6 i [sok-filter.md](specs/sok-filter.md)). Med väldigt många ärenden kan det bli långsamt.
- **Ett värde åt gången i varje filter** (SF-Q5). Man kan till exempel inte visa både *Nytt* och *Pågående* på en gång.

### Läget just nu

⚠️ Uppdateras innan inlämningen. Ta bort det som har blivit klart.

- Rubrik och beskrivning har ingen maxlängd, så mycket lång text avvisas inte (Q3 i [kravspec.md](specs/kravspec.md)).
- En lokal databasfil som skapades innan de tillåtna värdena lades in kan innehålla andra kategorier och prioriteter, till exempel "Support". Backend visar dem som de är, men nya ärenden kan bara få tillåtna värden. Den som vill börja om raderar `backend/app/data/nors.db`, se [beslut.md](beslut.md).

## Risker

| Risk | Vad kan hända | Hur vi minskar risken |
| --- | --- | --- |
| AI skriver kod som ser rätt ut men gör fel | Fel kommer in i `main` utan att någon märker det | Varje ändring granskas i en PR och kontrolleras med tester mot specen |
| Frontendens tester skrevs efter koden | Ett test går igenom fast koden gör fel | Varje test har jämförts med specen och setts misslyckas med ett tillfälligt fel, se [frontenduppdraget](agentuppdrag/2026-11-03-frontend-mot-spec.md). En senare granskning med en checklista hittade svagheter som hade missats, se [skill-uppdraget](agentuppdrag/2026-11-05-skill-checklista.md). De rättas i egna agentuppdrag |
| Granskningsrutinen följs inte alltid | Kod kommer in i `main` utan granskning. Det har hänt en gång (PR #2) | Alla påminns om rutinen. Inställningar på GitHub kan kräva ett godkännande innan merge |
| Krockar när flera ändrar samma fil | Ändringar skrivs över eller blir fel vid merge | Hämta det senaste innan man börjar, gör små PR:er och skriv i "sin" fil |
| Databasfilen `nors.db` raderas eller går sönder | Alla ärenden försvinner, eftersom det inte finns någon säkerhetskopia | Godtagbart för en lokal kursuppgift med påhittad data |
| Tiden räcker inte | Delar av kraven blir inte klara eller testade | Kärnflödet (skapa, lista, detaljer, status) och dess tester görs först |

## Förslag på fortsatt utveckling

- **Inloggning och roller**, så att varje handläggare har ett eget konto.
- **Ärendehistorik**, så att det syns vem som ändrade vad och när.
- **Interna anteckningar och tilldelning till handläggare.** De tilläggen valde vi bort, se [beslut.md](beslut.md).
- **Sökning i backend**, så att den går snabbt även med många ärenden.
- **Flera värden i samma filter**, till exempel både *Nytt* och *Pågående*.
- **Tester genom hela gränssnittet**, som klickar i webbläsaren som en riktig användare.
