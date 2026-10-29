# Vad är spec-driven utveckling?

Spec-driven utveckling (Spec-Driven Development) **vänder på steken** jämfört med traditionell mjukvaruutveckling. I årtionden har koden varit kung – specifikationer var bara byggställningar som vi satte upp och sedan slängde när det "riktiga arbetet" med kodningen började. Spec-driven utveckling ändrar på detta: **specifikationer blir körbara** och genererar direkt fungerande implementationer i stället för att bara vägleda dem.

## Grundfilosofi

Spec-driven utveckling är en strukturerad process som betonar:

- **Avsiktsdriven utveckling** där specifikationerna definierar "_vad_" innan "_hur_"
- **Rik specifikationsframtagning** med hjälp av skyddsräcken och organisatoriska principer
- **Förfining i flera steg** i stället för kodgenerering i ett enda steg utifrån prompter
- **Stort beroende** av avancerade AI-modellers förmåga att tolka specifikationer

Spec Kit föreskriver inte hur team ska bevara eller ändra `spec.md`, `plan.md`
och `tasks.md` när kraven ändras. Se
[Modeller för specbeständighet](spec-persistence.md) för begreppen och
[Vidareutveckla specar i befintliga projekt](../guides/evolving-specs.md) för
arbetsflöden för att vidareutveckla befintliga projekt.

När komponenter exponerar gränssnitt mot externa konsumenter, använd
[Kontraktsdriven utveckling](../guides/contract-driven-development.md) för att
komma överens om deras observerbara åtaganden innan varje sida implementeras.
Detta gäller oavsett arkitektur eller repostruktur.

## Utvecklingsfaser

| Fas                                         | Fokus                       | Huvudaktiviteter                                                                                                                                                 |
| ------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Utveckling från 0 till 1** ("Greenfield") | Generera från grunden       | <ul><li>Börja med övergripande krav</li><li>Generera specifikationer</li><li>Planera implementationssteg</li><li>Bygg produktionsfärdiga applikationer</li></ul> |
| **Kreativ utforskning**                     | Parallella implementationer | <ul><li>Utforska olika lösningar</li><li>Stöd för flera tekniska stackar och arkitekturer</li><li>Experimentera med UX-mönster</li></ul>                         |
| **Iterativ förbättring** ("Brownfield")     | Modernisering av befintligt | <ul><li>Lägg till funktioner iterativt</li><li>Modernisera äldre system</li><li>Anpassa processer</li></ul>                                                      |

## Experimentella mål

Vår forskning och experimentering fokuserar på:

### Teknikoberoende

- Skapa applikationer med olika tekniska stackar
- Validera hypotesen att spec-driven utveckling är en process som inte är bunden till specifika tekniker, programmeringsspråk eller ramverk

### Krav i större organisationer

- Visa utveckling av verksamhetskritiska applikationer
- Ta hänsyn till organisatoriska begränsningar (molnleverantörer, tekniska stackar, utvecklingsrutiner)
- Stödja organisationens designsystem och regelefterlevnadskrav

### Användarcentrerad utveckling

- Bygga applikationer för olika användargrupper och preferenser
- Stödja olika utvecklingssätt (från vibe-kodning till AI-native utveckling)

### Kreativa och iterativa processer

- Validera konceptet med parallell utforskning av implementationer
- Erbjuda robusta arbetsflöden för iterativ funktionsutveckling
- Utöka processerna till att hantera uppgraderingar och moderniseringsuppgifter
