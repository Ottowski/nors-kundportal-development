# **Bygg Kundserviceportalen med AI-stöd**

**Examinationsuppgift · Grupparbete med individuellt bidrag · Vecka 5-8**

I det här projektet använder ni kursens arbetssätt för att utveckla en mindre kundserviceportal. Ni går från att förstå och avgränsa ett behov till att specificera, bygga, testa och vidareutveckla en fungerande lösning med AI-stöd.

Målet är att ni ska kunna använda AI som en genomtänkt del av utvecklingsarbetet. Ni behöver kunna förklara vad ni har byggt, hur ni har styrt AI, vilka beslut ni själva har fattat och hur ni har kontrollerat resultatet.

När projektet är klart ska ni ha en körbar lösning och ett underlag som visar vägen från krav till verifierade förändringar.

# **Uppdraget**

Ett företag tar emot kundärenden genom flera kanaler. Informationen hamnar på olika platser och handläggarna har svårt att få en gemensam överblick.

Ni ska bygga **Kundserviceportalen**, där en handläggare kan registrera ett ärende, se vad det gäller och följa det genom ett enkelt arbetsflöde.

Gruppen väljer språk, ramverk, databas och klientplattform utifrån sin kompetens. Lösningen ska innehålla ett användargränssnitt, applikations- eller backendlogik och beständig lagring. Delarna kan finnas i samma applikation eller vara uppdelade.

### **Det här ska lösningen kunna göra**

- Registrera ett nytt kundärende och validera obligatorisk information.
- Spara ärenden så att de finns kvar när applikationen startas om.
- Visa en lista över ärenden och detaljer för ett valt ärende.
- Ändra status på ett ärende.
- Hantera minst ett felaktigt användningsfall med ett begripligt besked till användaren.
- Verifiera centrala beteenden med automatiserade tester som omfattar både happy paths och relevanta error paths.
- Kunna köras och demonstreras av någon annan med hjälp av era instruktioner.

Ett ärende ska innehålla rubrik, beskrivning, kategori, prioritet, aktuell status och tidpunkt då det skapades. Statusar kan exempelvis vara **Nytt**, **Pågående**, **Väntar på kund** och **Avslutat**. Ni kan anpassa den exakta modellen om ni dokumenterar och motiverar era val.

Välj också minst en kompletterande funktion, exempelvis interna anteckningar, tilldelning till handläggare, sökning och filtrering eller ärendehistorik. Ni kan föreslå en annan relevant funktion. Specificera och avgränsa den innan ni börjar implementera.

### **Håll uppgiften avgränsad**

Använd bara påhittade kunduppgifter. En lokal, körbar lösning räcker. Produktionsdrift, molninfrastruktur, avancerad autentisering och integrationer med e-post eller andra kanaler ingår inte i kraven.

AI används som stöd i utvecklingsarbetet. Det behöver inte finnas en AI-funktion i produkten. Lösningen ska kunna bedömas utan att den som granskar behöver ett personligt betalkonto.

# **Tester och verifiering**

Ni väljer vilka konkreta beteenden och testfall ni testar utifrån er specifikation och de risker ni ser. De automatiserade testerna ska verifiera lösningens centrala beteenden mot era acceptanskriterier. De ska omfatta både **happy paths**, där användningen lyckas som förväntat, och relevanta **error paths**, där felaktiga uppgifter eller misslyckade operationer hanteras. Välj också relevanta gränsfall utifrån era regler.

Exempel på möjliga kontroller:

- **Happy paths:** Ett giltigt ärende skapas med rätt uppgifter, eller en statusändring finns kvar när lagringen öppnas på nytt.
- **Error paths:** Saknad obligatorisk information avvisas utan att ett ärende sparas, eller en ogiltig status avvisas utan att den tidigare statusen ändras.
- **Gränsfall:** Text med enbart mellanslag hanteras enligt er regel för obligatoriskt innehåll, eller inmatning vid och över en dokumenterad längdgräns hanteras korrekt.
- **Kompletterande funktion:** Om ni valt interna anteckningar kan ni kontrollera att anteckningen kopplas till rätt ärende och att en tom anteckning hanteras enligt specifikationen.

Exemplen är stöd för ert urval, inte en obligatorisk testlista. Motivera varför era val ger relevant verifiering av lösningens centrala beteenden.

Dokumentera kort i er verifieringsplan på GitHub:

- **Vilka tester som finns:** länka till testerna och ange beteende, acceptanskriterium och förväntat resultat. Visa vilka happy paths, error paths och gränsfall som ingår.
- **Hur och varför:** beskriv vald testnivå och varför ni valt både dessa testfall och sättet att testa.
- **Resultat och begränsningar:** visa faktiska körresultat och vad kontrollerna inte visar. Skilj automatiserade tester från manuella kontroller och planerade kontroller från genomförda.

Närliggande tester kan beskrivas tillsammans. Dokumentera hur testerna körs så att vi kan upprepa dem. Ni väljer verktyg och testnivå; automatiserade tester genom hela gränssnittet krävs inte. Manuella kontroller kan komplettera, exempelvis för att bedöma om felmeddelanden är begripliga.

Happy paths och error paths ingår redan för G. Antal tester och täckningsprocent avgör inte betygsnivån. Varje student ska kunna visa och förklara verifieringen av sitt eget bidrag.

# **Kursexaminationens veckosektioner**

Uppgiften introduceras vecka 4 och projektarbetet genomförs vecka 5-8. Ni får börja frivilligt redan vecka 4. Den fristående kodövningen finns kvar.

Veckorna beskriver vad vi förväntar oss att ni ska ha klart vid respektive veckas slut. Ni får gärna ligga före och gå vidare med kommande delar när ni är redo. Har ni hunnit längre är det bara positivt! Fortsätt att dokumentera och kontrollera det ni gör, så att vi kan följa arbetet.

Arbetet utvecklas tillsammans med veckornas undervisning. Ni behöver inte kunna alla metoder när ni börjar. Agentarbete och gemensamma AI-arbetsflöden introduceras under projektperioden. Projektstarten vecka 5 förutsätter inte att ni har börjat tidigare.

Arbeta löpande med både lösningen och dokumentationen. Använd GitHub för att planera uppgifter, följa förändringar och granska varandras bidrag. Gör ansvar, frågor och nästa steg tydliga så att arbetet kan fortsätta även när ni arbetar vid olika tider.

Varje team använder en egen fork och samma löpande PR till kursens gemensamma GitHub-repository. Startinstruktionerna finns på undersidan för vecka 5.

# Kundserviceportalen – kravspecifikation

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

## Utgångsläge

Backend och frontend är startade lokalt enligt README. Databasen innehåller
noll eller flera ärenden.

## Ett ärende ska innehålla

- **Rubrik**
  - **Obligatoriskt:** Ja, anges av handläggaren
  - **Regel:** Får inte vara tom eller bara mellanslag. Maxlängd: se öppna frågor

- **Beskrivning**
  - **Obligatoriskt:** Ja, anges av handläggaren
  - **Regel:** Får inte vara tom eller bara mellanslag. Maxlängd: se öppna frågor

- **Kategori**
  - **Obligatoriskt:** Ja, anges av handläggaren
  - **Regel:** Ett av de tillåtna värdena (se öppna frågor)

- **Prioritet**
  - **Obligatoriskt:** Ja, anges av handläggaren
  - **Regel:** Ett av de tillåtna värdena (se öppna frågor)

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
- **R11 – Sökning och filtrering:** Specificeras i `docs/specs/sok-filter.md`.

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

## Öppna frågor

- **Vilka kategorier ska finnas?**
  - **Varför det spelar roll:** Behövs för R4 och för filtreringen

- **Vilka prioriteter ska finnas (t.ex. Låg/Medel/Hög)?**
  - **Varför det spelar roll:** Behövs för R4

- **Vilka maxlängder gäller för rubrik och beskrivning?**
  - **Varför det spelar roll:** Gränsfall: både exakt vid gränsen och över den måste ha en regel

- **Får man gå tillbaka från *Avslutat*?**
  - **Varför det spelar roll:** Påverkar R8 och vilka statusändringar som är giltiga

- **Ska ärendet innehålla kunduppgifter (namn, e-post, telefon)?**
  - **Varför det spelar roll:** Läraren nämnde validering av t.ex. telefonnummer. Kräver i så fall egna regler

- **I vilken ordning ska listan visas?**
  - **Varför det spelar roll:** R6 har ett förslag som inte är beslutat
