# Kundserviceportalen – kravspecifikation

Specen beskriver vad lösningen ska göra i kärnflödet. Kursens uppgiftsbeskrivning
finns ordagrant i [uppdrag.md](../uppdrag.md). Tillägget sökning och filtrering
specificeras i [sok-filter.md](sok-filter.md). Arbetssättet beskrivs i
[spec-driven-dev.md](spec-driven-dev.md) och strukturen följer
[specmallen](../mallar/spec.md).

## Uppdragets krav och var de täcks

| Uppdragets krav | Täcks av | Lucka |
| --- | --- | --- |
| Registrera ärende och validera obligatorisk information | R1–R4, A1–A4 | – |
| Ärenden finns kvar efter omstart | R5, A5, A8 | – |
| Lista och detaljer för valt ärende | R6, R7, A6, A7 | – |
| Ändra status | R8, A8 | – |
| Minst ett felfall med begripligt besked | R3, R9, R10, A2–A4, A9, A10 | "Begripligt" är inte definierat |
| Ärendets fält (rubrik, beskrivning, kategori, prioritet, status, skapad) | "Ett ärende ska innehålla", R1 | Värden för kategori och prioritet är öppna (Q1, Q2) |
| Kompletterande funktion, specificerad före implementation | R11 | `sok-filter.md` saknas |
| Automatiserade tester med happy och error paths | [verifieringsplan.md](../verifieringsplan.md) (inget R) | Gränsfall för längd kräver beslutad maxlängd (Q3) |
| Kan köras och demonstreras av någon annan | [README](../../README.md) (inget R) | Kan bli ett kvalitetskrav |
| Bara påhittade kunduppgifter; lokal lösning; ingen drift, inget moln, inga integrationer; ingen AI-funktion | Avgränsning, "Ingår inte" | – |
| Ska kunna bedömas utan personligt betalkonto | – | Saknas helt |

## Problem

Företaget tar emot kundärenden genom flera kanaler. Informationen hamnar på olika
platser och handläggarna har svårt att få en gemensam överblick.

## Syfte

Kundservicehandläggare ska kunna samla ärenden på ett ställe, se vad de gäller
och följa dem genom ett enkelt arbetsflöde.

## Önskat resultat

En lokal, körbar webbapp där en handläggare kan registrera ett ärende, se en lista
och detaljer, ändra status och söka/filtrera bland ärenden. Ärendena finns kvar
efter omstart, felaktig inmatning ger begripliga besked, och centrala beteenden
verifieras med automatiserade tester.

## Avgränsning

### Ingår

- Registrera ärende med validering av obligatorisk information
- Beständig lagring
- Lista över ärenden och detaljvy för ett valt ärende
- Ändra status
- Begripliga felmeddelanden vid felaktig användning
- Tillägg: sökning och filtrering
- Automatiserade tester (happy paths, error paths, gränsfall)
- Körinstruktioner så att någon annan kan köra lösningen

### Ingår inte

- Inloggning och autentisering
- Produktionsdrift (localhost t.ex.) och molninfrastruktur
- Integrationer med e-post eller andra kanaler
- AI-funktion i produkten
- Riktiga kunduppgifter – bara påhittad data
- Radera ärenden
- Redigera ett ärende utöver status dvs **bara** status ska kunna ändras på ett ärende

## Förutsättningar

Backend och frontend är startade lokalt enligt README. Databasen innehåller
noll eller flera ärenden.

## Ett ärende ska innehålla

- **Rubrik**
  - **Obligatoriskt:** Ja, anges av handläggaren
  - **Regel:** Får inte vara tom eller bara mellanslag. Maxlängd: se Q3

- **Beskrivning**
  - **Obligatoriskt:** Ja, anges av handläggaren
  - **Regel:** Får inte vara tom eller bara mellanslag. Maxlängd: se Q3

- **Kategori**
  - **Obligatoriskt:** Ja, anges av handläggaren
  - **Regel:** Ett av de tillåtna värdena (se Q1)

- **Prioritet**
  - **Obligatoriskt:** Ja, anges av handläggaren
  - **Regel:** Ett av de tillåtna värdena (se Q2)

- **Status**
  - **Obligatoriskt:** Sätts automatiskt
  - **Regel:** Nytt vid skapande. Tillåtna: Nytt, Pågående, Väntar på kund, Avslutat

- **Skapad**
  - **Obligatoriskt:** Sätts automatiskt
  - **Regel:** Tidpunkt då ärendet skapades. Ändras aldrig

## Beteendekrav

- **R1 – Registrera:** Ett ärende skapas med rubrik, beskrivning, kategori och prioritet. Status sätts till *Nytt* och skapad-tid sätts automatiskt.
- **R2 – Obligatoriska fält:** Rubrik, beskrivning, kategori och prioritet måste anges. Text med enbart mellanslag räknas som tom.
- **R3 – Allt eller inget:** Om någon uppgift är ogiltig sparas inget ärende, och användaren får ett begripligt besked om vad som är fel.
- **R4 – Tillåtna värden:** Kategori och prioritet måste vara ett av de tillåtna värdena.
- **R5 – Beständig lagring:** Skapade ärenden och statusändringar finns kvar efter att applikationen startats om.
- **R6 – Lista:** Alla ärenden visas i en lista med minst rubrik, status, prioritet och skapad-tid. Nyaste först *(mitt förslag)*.
- **R7 – Detaljer:** När ett ärende väljs visas alla dess fält.
- **R8 – Ändra status:** Status kan ändras till ett av de tillåtna värdena. Övriga fält ändras inte.
- **R9 – Ogiltig status:** En status som inte är tillåten avvisas, tidigare status ligger kvar och användaren får ett begripligt besked.
- **R10 – Ärende saknas:** Om ett ärende som inte finns efterfrågas får användaren ett begripligt besked *(mitt förslag)*.
- **R11 – Sökning och filtrering:** Specificeras i [sok-filter.md](sok-filter.md).

## Acceptanskriterier

### A1

- **Utgångsläge:** Inga ärenden finns
- **Handling:** Handläggaren skapar ett ärende med giltiga uppgifter
- **Förväntat resultat:** Ärendet sparas med status *Nytt* och en skapad-tid. Det syns i listan
- **Kontrollerar:** R1

### A2

- **Utgångsläge:** Två ärenden finns
- **Handling:** Handläggaren försöker skapa ett ärende utan rubrik
- **Förväntat resultat:** Ärendet avvisas med ett begripligt besked. Det finns fortfarande två ärenden
- **Kontrollerar:** R2, R3

### A3

- **Utgångsläge:** Två ärenden finns
- **Handling:** Handläggaren anger en rubrik med bara mellanslag
- **Förväntat resultat:** Samma som A2
- **Kontrollerar:** R2, R3

### A4

- **Utgångsläge:** Två ärenden finns
- **Handling:** Handläggaren anger en kategori som inte är tillåten
- **Förväntat resultat:** Ärendet avvisas med ett begripligt besked. Inget nytt ärende sparas
- **Kontrollerar:** R3, R4

### A5

- **Utgångsläge:** Ett ärende har skapats
- **Handling:** Applikationen startas om
- **Förväntat resultat:** Ärendet finns kvar med samma uppgifter
- **Kontrollerar:** R5

### A6

- **Utgångsläge:** Tre ärenden finns
- **Handling:** Handläggaren öppnar listan
- **Förväntat resultat:** Alla tre visas med rubrik, status, prioritet och skapad-tid
- **Kontrollerar:** R6

### A7

- **Utgångsläge:** Ett ärende finns
- **Handling:** Handläggaren väljer ärendet
- **Förväntat resultat:** Alla fält visas
- **Kontrollerar:** R7

### A8

- **Utgångsläge:** Ett ärende har status *Nytt*
- **Handling:** Status ändras till *Pågående*, och appen startas om
- **Förväntat resultat:** Status är *Pågående*. Övriga fält är oförändrade
- **Kontrollerar:** R5, R8

### A9

- **Utgångsläge:** Ett ärende har status *Nytt*
- **Handling:** Status försöker ändras till ett ogiltigt värde
- **Förväntat resultat:** Ändringen avvisas med ett begripligt besked. Status är fortfarande *Nytt*
- **Kontrollerar:** R9

### A10

- **Utgångsläge:** Inget ärende med det id:t finns
- **Handling:** Handläggaren försöker öppna det
- **Förväntat resultat:** Ett begripligt besked visas
- **Kontrollerar:** R10

## Kvalitetskrav

Inga kvalitetskrav är beslutade ännu. Kursen kräver minst ett, se Q7.

## Antaganden och öppna frågor

- **Q1 – Vilka kategorier ska finnas?**
  - **Varför det spelar roll:** Behövs för R4 och för filtreringen
  - **Status:** Öppen

- **Q2 – Vilka prioriteter ska finnas (t.ex. Låg/Medel/Hög)?**
  - **Varför det spelar roll:** Behövs för R4
  - **Status:** Öppen

- **Q3 – Vilka maxlängder gäller för rubrik och beskrivning?**
  - **Varför det spelar roll:** Gränsfall: både exakt vid gränsen och över den måste ha en regel
  - **Status:** Öppen

- **Q4 – Får man gå tillbaka från *Avslutat*?**
  - **Varför det spelar roll:** Påverkar R8 och vilka statusändringar som är giltiga
  - **Status:** Öppen

- **Q5 – Ska ärendet innehålla kunduppgifter (namn, e-post, telefon)?**
  - **Varför det spelar roll:** Läraren nämnde validering av t.ex. telefonnummer. Kräver i så fall egna regler
  - **Status:** Öppen

- **Q6 – I vilken ordning ska listan visas?**
  - **Varför det spelar roll:** R6 har ett förslag som inte är beslutat
  - **Status:** Öppen

- **Q7 – Vilket kvalitetskrav (K1) ska gälla, och hur kontrolleras det?**
  - **Varför det spelar roll:** Kursen kräver minst ett kontrollerbart icke-funktionellt krav, märkt som eget förslag
  - **Status:** Öppen
