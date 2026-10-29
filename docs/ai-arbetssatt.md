# AI-arbetssätt

## Verktyg vi använder

Claude

## Gemensamma instruktioner

Ja - projektet har en `CLAUDE.md` i repots rot som ger gemensam kontext om arkitektur och restriktioner.

## Arbetsflöde

Vi arbetar spec-drivet enligt avsnittet "Så arbetar vi i NORS" i [spec-driven-dev.md](specs/spec-driven-dev.md). Avgränsade moment som lämnas till en AI-agent dokumenteras i [agentuppdrag/](agentuppdrag/).

(Exempel: hur används AI i ert arbete - för kod, dokumentation, testning? I vilket skede av arbetet används det?)

## Återanvändbara moment

### Startprompt: få hjälp med frågor

Används när vi börjar på en ny spec.

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

När vi har svarat kan vi be AI sammanställa svaren till en kort spec. Kontrollera att texten skiljer våra beslut från förslag, antaganden och öppna frågor.

### Granskningsprompt: innehåll och struktur

Används när ett utkast till spec finns. Klistra in både uppgiftsbeskrivningen och specen.

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

### Mallar

- [Spec](mallar/spec.md)
- [Agentuppdrag](mallar/agentuppdrag.md)

## Granskning av AI-förslag

Återkoppling från AI på en spec bedöms enligt steg 2 i [spec-driven-dev.md](specs/spec-driven-dev.md): vi väljer vad vi använder, nyanserar eller avvisar och skriver kort varför.

(Exempel: hur granskar ni det AI föreslår innan det mergas - vem läser igenom, och vilka krav ställs?)
