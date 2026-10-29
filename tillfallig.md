# Starterkit: Börja skriva en specifikation

Vi kan börja med en bred beskrivning. Specifikationen växer fram när vi reder ut beteenden, gör besluten synliga och går igenom konkreta situationer. I spec-driven development använder vi sedan beskrivningen för att styra implementationen och bedöma resultatet.

## Fyra steg

1. **Beskriv behovet.** Vad vill vi åstadkomma, för vem och varför? Några meningar räcker som början.
2. **Red ut beteendet och vägvalen.** Vilket är utgångsläget, vad gör användaren och vad ska hända? Markera vägval och frågor.
3. **Gå igenom konkreta situationer. Ger texten ett tydligt svar?** Välj ett utgångsläge och en handling. Försök beskriva resultatet med bara specifikationen som stöd. Om du behöver gissa, markera vad som saknar svar.
4. **Samla besluten och granska texten.** Strukturera texten. Kontrollera att den återger besluten och markera det som fortfarande är oklart.

Vi kan göra detta själva, med en klasskamrat eller med AI som stöd. Vi ansvarar för besluten även när AI hjälper oss att hitta frågor.

## Så går vi igenom en konkret situation

Vi tänker igenom vad som ska hända utifrån texten. Vi behöver inte bygga ett gränssnitt eller köra kod för att upptäcka att en regel saknas.

Anta att vår första beskrivning bara säger:

> När det finns en rapport ska användaren kunna ladda ner den med en knapp.

| Konkret situation | Ger beskrivningen ett tydligt svar? |
|---|---|
| En rapport finns. Användaren klickar på knappen. | Ja: rapporten ska laddas ner. |
| Ingen rapport finns. Användaren öppnar vyn. | Nej: det framgår inte om knappen ska döljas eller vara inaktiverad. |

I genomgångens exempel väljer vi att knappen alltid visas och är inaktiverad (disabled) när ingen rapport går att ladda ner. När en rapport finns är knappen aktiverad och kan starta nedladdningen. Valet förtydligar beskrivningen och kan uttryckas som ett acceptanskriterium:

- **Utgångsläge:** Ingen rapport finns att ladda ner.
- **Handling:** Användaren öppnar vyn.
- **Förväntat resultat:** Knappen ”Ladda ner rapport” visas inaktiverad och kan inte starta en nedladdning.

Om vi ännu inte hade valt regeln skulle frågan stå kvar som öppen. Vi hittar inte på ett svar för att göra texten komplett.

### Samma struktur i Given/When/Then

```gherkin
Scenario: Rapport finns att ladda ner
  Given det finns en rapport att ladda ner
  When vyn visas
  Then är knappen ”Ladda ner rapport” aktiverad
  And rapporten kan laddas ner genom ett klick på knappen
```

Given anger utgångsläget, When handlingen och Then det förväntade resultatet. Detta är ett beskrivande exempel, inte ett automatiserat eller kört test. Vanlig svensk text fungerar också i vår övning; Cucumber eller Gherkin behövs inte.

## Rubriker som hjälper oss att tänka

| Rubrik | Vad den hjälper oss att reda ut |
|---|---|
| Syfte och användare | Varför behövs funktionen och för vem? Markera om syftet är ett eget förslag. |
| Vad ingår? | Vilka delar och beteenden beskriver vi? |
| Avgränsning: vad ingår inte? | Vad lämnar vi uttryckligen utanför? Hitta inte på avgränsningar och presentera dem som givna. |
| Förutsättningar | Vad gäller innan en handling påbörjas, exempelvis vilka sektioner som är öppna från början? |
| Beteendekrav: vad ska hända? | Vilka observerbara regler ska gälla? |
| Acceptanskriterier: konkreta exempel att kontrollera | Vilket utgångsläge, vilken handling och vilket förväntat resultat prövar regeln? |
| Antaganden och öppna frågor | Vad har vi själva föreslagit eller antagit, och vad saknar fortfarande svar? |

Rubriker hjälper både oss och AI att hitta regler, exempel och öppna frågor. Använd dem när de hjälper till att skilja innehåll åt. Fler rubriker gör inte automatiskt texten bättre.

Kvalitetskrav kan beskrivas separat när de behövs. ”Det ska vara lätt att använda” är svårt att kontrollera. Ett konkret förslag är att pilknapparna ska kunna nås och aktiveras med tangentbord, utan mus. Det kan kontrolleras genom tangentbordsanvändning. Detta är ett separat exempel från genomgången, inte ett nytt givet krav i accordion-övningen.

## Beteendekrav och acceptanskriterium bredvid varandra

| Beteendekrav: vad ska hända? | Acceptanskriterium: ett konkret exempel att kontrollera |
|---|---|
| R1. När en stängd sektion öppnas ska eventuell tidigare öppen sektion stängas. | **Utgångsläge:** Sektion 1 är öppen, övriga stängda. **Handling:** Användaren trycker på pilknappen vid rubrik 2. **Förväntat resultat:** Bara sektion 2 är öppen. Alla rubriker och pilknappar är fortfarande synliga. |

Kravet beskriver regeln generellt. Exemplet beskriver en bestämd situation. R1 är ett enkelt ID som visar kopplingen. Ett krav kan behöva flera exempel. Tabellen är förklarande stöd; den egna specifikationen kan använda separata rubriker och listor.

## Startprompt: få hjälp med frågor

```text
Jag vill beskriva en funktion innan jag bygger den.

## Min första beskrivning
[Skriv vad du vill åstadkomma.]

## Din uppgift
Hjälp mig att reda ut syfte, utgångsläge och beteenden.
Ställ en konkret fråga i taget och börja med det som mest påverkar
vad som ska byggas. Föreslå inte nya funktioner. Fråga när något
är oklart och vänta med kod och teknisk lösning.
```

När vi har svarat kan vi be AI sammanställa svaren till en kort specifikation. Kontrollera att texten skiljer våra beslut från förslag, antaganden och öppna frågor. I tisdagens övning skriver vi ett eget första utkast före AI-granskningen.

## Granskningsprompt: innehåll och struktur

Rubrikerna separerar granskningsuppgiften, svarsformatet och underlaget. Klistra in både uppgiftsbeskrivningen och din egen text.

```text
Granska min specifikation. Skriv ingen kod och gör ingen omskrivning ännu.

## Underlag
Jag skickar uppgiftsbeskrivningen och min specifikation nedan.
Utgå från dem. Presentera inte egna antaganden som mina beslut.

## Granska innehållet
Leta efter:
- formuleringar som kan tolkas på olika sätt
- motstridiga beteendekrav
- situationer där förväntat resultat saknas
- acceptanskriterier som saknar tydlig koppling till ett krav

Ge konkreta exempel och hänvisa till berörd formulering.
Skilj frågor inom uppgiften från förslag som utökar den.

## Granska strukturen
Kontrollera om tydliga rubriker hjälper läsaren att skilja mellan:
- vad som ingår
- avgränsning: vad som inte ingår
- beteendekrav: vad som ska hända
- acceptanskriterier: konkreta exempel att kontrollera
- antaganden och öppna frågor

Om strukturen gör något svårt att hitta eller förstå, föreslå
en rubrik eller uppdelning och förklara vad den skulle förtydliga.
Lägg inte till rubriker som inte behövs.

## Format på ditt svar
Använd tydliga rubriker:
1. Oklarheter och motexempel
2. Struktur och rubriker
3. Frågor jag behöver ta ställning till

Om du inte hittar en brist, säg det. Hitta inte på problem.

## Uppgiftsbeskrivning
[Klistra in underlaget här.]

## Min specifikation
[Klistra in ditt utkast här.]
```

## Bedöm återkopplingen själv

Jämför synpunkterna med uppgiftsbeskrivningen. Välj vad du använder, nyanserar eller avvisar och skriv kort varför. En AI-synpunkt blir inte automatiskt ett krav. Spara gärna utkastet före och efter ändringen så att du kan se vad som förbättrades.


Det här tränar du på
Förklara spec-driven development i AI-stött arbete.
Formulera prompts och specifikationer för relevanta AI-resultat.
Strukturera och bryta ner utvecklingsproblem för AI-stödd lösning.
Tillämpa spec-driven development i AI-stödda uppgifter.
Här tränar du på att formulera, granska och revidera specifikationer. Nästa vecka kopplar vi arbetssättet till en mindre kodförändring.

Skriv specifikation v1
Skriv en kort specifikation i Markdown. Använd följande struktur:

Del

Innehåll

Syfte och användare

Vilket resultat behövs och för vem?

Omfattning och icke-mål

Vad ingår och vad ligger utanför?

Förutsättningar

Vad gäller innan en åtgärd påbörjas?

Krav

Numrerade krav, exempelvis R1 och R2, som beskriver observerbara beteenden.

Acceptanskriterier

Konkreta situationer med förutsättning, åtgärd och förväntat resultat. Koppla varje kriterium till ett krav.

Kvalitetskrav

Minst ett kontrollerbart icke-funktionellt krav, märkt som ditt eget övningsförslag. Ange hur det kan kontrolleras.

Antaganden och öppna frågor

Dina val, varför de behövs och vad som fortfarande är oklart.

Det här tar vi upp
Hur du väljer tester utifrån krav och förväntat beteende, inklusive gränsfall och negativa fall där lösningen ska hantera felaktig indata.
Hur du reproducerar ett fel och beskriver skillnaden mellan förväntat och faktiskt resultat.
Hur du ger AI relevant kontext och använder förslagen för att undersöka en möjlig felorsak i taget.
Hur du kontrollerar rotorsaken och prövar en rättning med regressionstester som fångar felet om det återkommer och kontrollerar tidigare fungerande beteenden.
Hur du använder AI som stöd för dokumentation och granskar att den återger faktiska kontroller, resultat och kvarstående osäkerheter. 

Lärandemål
Vi tränar följande mål. Under passet ligger fokus på testning och felsökning; prototyparbetet tillämpas i gruppens projekt. Självständigheten byggs upp över tid genom kursen.

Förklara hur AI används i kodning, test och felsökning.
Strukturera och bryta ner utvecklingsproblem för AI-stödd lösning.
Bygga prototyper och testa lösningar med stöd av AI.
Självständigt använda AI för att öka kvalitet och effektivitet i utvecklingsarbete.
Introduktion och läromål
Hur ger du en AI-agent ett tydligt uppdrag och behåller kontrollen över arbetet?

Den här veckan börjar vi med agentic development. Vi undersöker hur en agent kan genomföra flera steg i ett avgränsat utvecklingsmoment och vad du behöver bestämma innan arbetet börjar: mål, kontext, tillåtna ändringar, verktyg och när agenten ska stanna för avstämning.

Vi bygger vidare på förra veckans testning och granskning. Du får se hur tydliga instruktioner och kontrollpunkter hjälper dig att följa arbetet, granska förändringar och kontrollera att resultatet uppfyller kraven. Vi börjar också undersöka hur instruktioner och kontroller kan återanvändas när samma typ av utvecklingsmoment återkommer.

I Kundserviceportalen fortsätter ni med det centrala ärendeflödet. Du leder ett eget avgränsat tekniskt bidrag, använder en agent som stöd och granskar och verifierar resultatet innan förändringen förs in i gruppens lösning. Projektarbetet sker på egen tid och kan samordnas asynkront.

Den här veckan introducerar och tränar vi följande mål. Självständighet och förmågan att stödja återkommande utvecklingsmoment byggs upp över flera veckor.

Beskriva agentic development och användning av AI-agenter.
Använda AI-verktyg för att effektivisera kodning och utvecklingsarbete.
Tillämpa agentic development för avgränsade utvecklingsmoment.
Självständigt använda AI för att öka kvalitet och effektivitet i utvecklingsarbete.
Effektivisera sin arbetsprocess genom att använda AI för att automatisera och stödja återkommande utvecklingsmoment.

Agentic development: avgränsad delegering
Vecka 6 · Tisdag 27 oktober · 10.00-12.00

En AI-agent kan läsa kod, göra ändringar och köra kontroller. Hur formulerar du ett uppdrag som den kan genomföra och som du kan följa upp?

Den här lektionen introducerar agentic development. Vi undersöker hur arbetet förändras när AI får använda verktyg och genomföra flera steg i en uppgift. Du behöver bestämma vad agenten ska åstadkomma, vilka gränser som gäller och hur resultatet ska kontrolleras.

Vi bygger vidare på specifikationer, testning och granskning från tidigare veckor. I en lärarledd demonstration följer vi en liten kodförändring från uppdrag och plan till agentens arbete, granskning och faktiska kontrollresultat.

Det här tar vi upp
Skillnaden mellan att be om ett förslag och att låta en agent genomföra ett utvecklingsmoment med verktyg.
Hur du beskriver mål, relevant kontext, avgränsning och kriterier för att uppgiften ska räknas som klar.
Hur du skiljer skrivna instruktioner från de faktiska behörigheter och verktyg agenten har tillgång till.
Hur du granskar planen och bestämmer när agenten får fortsätta, ska fråga eller behöver stanna.
Hur du granskar kodändringar, upptäcker arbete utanför uppdraget och kontrollerar resultatet mot kraven.
Hur instruktioner och kontroller kan återanvändas för återkommande moment, med anpassning och granskning vid varje användning.
Lärandemål
Vi introducerar och tränar följande mål. Självständighet och stöd för återkommande utvecklingsmoment byggs upp genom fortsatt tillämpning under kursen.

Beskriva agentic development och användning av AI-agenter.
Använda AI-verktyg för att effektivisera kodning och utvecklingsarbete.
Tillämpa agentic development för avgränsade utvecklingsmoment.
Självständigt använda AI för att öka kvalitet och effektivitet i utvecklingsarbete.
Effektivisera sin arbetsprocess genom att använda AI för att automatisera och stödja återkommande utvecklingsmoment.
Inför lektionen
Återbesök förra veckans arbete med testning och verifiering. Fundera på en mindre kodförändring: vilken information skulle någon annan behöva för att genomföra den, och hur skulle du kontrollera resultatet?

Vi kollar på ett gemensamt exempel. Du kan följa genomgången utan att ha förberett kod eller installerat ett särskilt agentverktyg.

Under och efter passet
Vi varvar genomgångar och demonstration med korta reflektionsfrågor. Du får tänka igenom nästa steg innan vi låter agenten fortsätta: är uppdraget tydligt, ligger ändringen inom avgränsningen och räcker kontrollerna? Frågorna fungerar både live och genom att pausa inspelningen. Det finns tid för paus och studentfrågor.

Efter passet tillämpar du arbetssättet i ditt eget tekniska bidrag till Kundserviceportalen. Avgränsa momentet, formulera agentens uppdrag och granska resultatet innan förändringen integreras. Dokumentera relevanta instruktioner, beslut och faktiska verifieringsresultat som en del av projektarbetet.

Arbetet sker på egen tid och samordnas asynkront med gruppen. På torsdag fortsätter vi med fördjupning och granskning av agentarbete. En gästföreläsning planeras; medverkan och detaljer återstår att bekräfta.

Vecka 6: Det centrala flödet
Implementera flödet för att registrera, visa och uppdatera ärenden. Arbeta i små förändringar som går att förstå och granska.

Ge AI relevant projektkontext och tydliga uppgifter. Använd avgränsade agentuppdrag med tydliga instruktioner, begränsningar och kontrollpunkter. Granska förslagen innan de blir en del av den gemensamma lösningen.

Kör tester för centrala beteenden med både happy paths och relevanta error paths och följ upp avvikelser. Dokumentera vilka tester som finns, varför ni valt dem och vad körningarna visade enligt testavsnittet på huvudsidan. AI besked att något fungerar behöver stödjas av faktiska kontroller.

Det här förväntar vi oss ska vara klart vid slutet av vecka 6:

Det centrala flödet fungerar: registrera och spara ärenden, visa lista och detaljer samt ändra status.
Ni har genomfört avgränsat agentarbete och sparat instruktioner och mänsklig granskning.
Automatiserade tester för centrala beteenden har körts och resultaten är dokumenterade.
Varje students tekniska bidrag går att följa i projektet.
Följ upp arbetet
Ni får gärna ligga före och gå vidare med kommande delar när ni är redo. Visa ert faktiska läge i veckostatusen, även om ni hunnit längre eller har något kvar. Följ instruktionen Följ upp arbetet varje vecka på huvudsidan.