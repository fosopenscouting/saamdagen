# Saamdagen

Android app voor de komende editie van Saamdagen.

De applicatie voor de editie van 2021 is geschreven in React Native met Expo.

## Setup/Running

### Installatie algemene tools

- Node.js 14+ (dit installeert ook meteen npm)
- Yarn ( `npm install -g yarn`)
- eas (enkel als je store builds wil maken) (`npm install -g eas`)
- Expo Go (iOS of Android app)

### Tooling

- VS Code is een goede optie om in te ontwikkelen. Bij het openen van deze repo in VS Code zal je ook een aantal suggesties krijgen voor handige extensies.
- React Native Directory: directory met third party libraries die compatibel zijn met React Native. <https://reactnative.directory/>

### .env file

Je hebt een .env bestand nodig om een aantal instellingen te kunnen uitlezen. Je kan een aanmaken op basis van `.env.example`

### Expo account
Je hebt een account nodig op <https://expo.dev/>. Vervolgens dien je aan iemand van de werkgroep te vragen om je toegang te geven tot het project.

> Op expo.dev kunnen members toegevoegd worden onder de 'members' tab van de organisatie.

### Lokaal uitvoeren (development)

Voer deze commando's uit in de 'root' map. Dit is de map waarin het bestand 'package.json' zich bevindt.

- `$ yarn install` (enkel bij de eerste keer starten)
- `$ npx expo start`
- Scan de QR code die verschijnt met de Expo app

> De eerste keer dat je de applicatie start zal Expo je vragen om in te loggen met je Expo account dat je eerder aanmaakte.

Zie de Expo documentatie voor meer info: <https://docs.expo.io/get-started/create-a-new-app/>

#### Uitvoeren in een emulator

1. Installeer en start een iOS en/of Android emulator
2. Volg de algemene stappen zoals hierboven beschreven
3. Kies, in het browserscherm dat opende na `expo start`te draaien, om de app te openen in een emulator naar keuze.

## Branching

**master:** Code zoals ze in productie is. Changes op deze branch triggeren een build en deploy

**saamdagen-2019:** App voor de editie van 2019. Deze versie wordt bewaard in een aparte branch omdat er tussen '19 en '20 volledig opnieuw werd begonnen.

**saamdagen-2020**: App voor de afgelaste editie van 2020. Deze applicatie werd nooit afgewerkt of gebruikt.

Push nooit direct naar de master branch, maar gebruik Pull Requests.

## CI/CD

Elke push naar master triggert een Expo Publish. Nieuwe versies worden standaard naar een staging release channel gereleased. Om te releasen naar productie is een approval nodig.

- codeql-analysis.yml: statische code analyse check van GitHub
- expo-publish.yml: update de app in Expo. Publiceert de app ook naar een staging kanaal
- pr-validation.yml: basis validatie om te kijken of de app build en of de linter slaagt. Draait enkel op Pull Requests
- store-submit.yml: triggert een EAS build

## Expo upgraden
Expo brengt regelmatig een nieuwe versie van de SDK uit, het kan gebeuren dat de Expo Go app de Saamdagen app niet meer wil openen.

Release notes en upgrade instructions: <https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/>


## Deployen naar stores

2. Trigger de GitHub Action 'EAS build'. Dit start een niet interactieve build voor zowel iOS als Android. Eenmaal de build klaar is kan je de artifacts downloaden vanuit het Expo dashboard en deze submitten naar de store.

    > Apple provisioning certificaten kunnen verlopen. Als dit het geval is, dan dien je lokaal te builden en kan je via terminal authenticeren bij apple. Je doet dit zo:

    1. In `app.json`, vervang `#{APP_VERSION}#` door een dummy version. Commit en push dit **niet**. We doen dit enkel omdat EAS een geldig versienummer nodig heeft.
    2. Run een build voor iOS
        >``bash
        >eas build --platform ios
        >``
    3. Volg de prompts om credentials te vernieuwen
    4. Annuleer de build die net aangemaakt werd
    

     > Deze build kan je niet gebruiken om te submitten naar de stores, het buildNumber wordt niet verhoogd. Annuleer de build en retrigger de GH action (je certificaat is vernieuwd).

    >De action verhoogt de nodige versienummers (buildNumber en versionCode) in app.json.

3. Submit naar de stores. Momenteel doe je dit nog handmatig via de respectievelijke app consoles voor Android en iOS.

> Dit kan enkel gedaan worden door een persoon die toegang heeft tot de iOS developer console en Google Play Console.

## Content

Content in de app komt uit een andere repository: <https://github.com/fosopenscouting/Saamdagen-App-inhoud>. Er zijn hier 2 omgevingen gedefinieerd: Staging en Production. In je .env file kan je wisselen tussen deze twee. Zo kan de content al klaargezet worden zonder dat eindgebruikers deze te zien krijgen. Eenmaal in de app kan je naar onder swipen (gebeurt ook automatisch) om een update te triggeren waarna de content lokaal opgeslagen wordt (en beschikbaar blijft zonder internet toegang).

> Afbeeldingen zoals de plattegrond zitten nog hardcoded in de applicatie. Voor deze te wijzigen moet een update gedaan worden aan de app.

## Deep-linking

Gebruikers kunnen hun ticket in de app zetten d.m.v. een link. We hanteren hier een 'hack' omdat links met specifieke prefix (saamdagen://) niet altijd werken.

URL voor deep-linking: https://ticketing.fos.be/external/app/{ticketHash}

Deze link verwijst door naar saamdagen://more/profile?hash=${ticketHash}. Op mobiele devices wordt zo de app geopend.

Voor *DEV* testing kan je https://app.saamdagen.be/ticket-dev.html?hash={ticketHash} gebruiken. Let er wel op dat je de pagina aanpast zodat je doorverwezen wordt naar je lokale expo instantie. (bijv. exp://10.10.8.243:19000/--/more/profile?hash=${myParam}).

## OTA updates

Er zijn 2 manieren om een update tot bij eindgebruikers te krijgen:

- Volledige publicatie naar de app stores (zie hierboven)
- Over The Air (OTA) updates

Een OTA update wordt uitgevoerd bij elke push/merge naar master. De app wordt via Expo geupdatet, zonder dat gebruikers de app moeten updaten in de store.

> Niet alle wijzigingen aan de app kunnen als OTA update uitgerold worden. Bijv. dependency updates. Bekijk voor de nuances de documentatie van Expo.

## Versioning

GitVersion wordt gebruikt in Github Actions om automatisch een Semver versie te genereren. Standaard wordt de patch versie met 1 verhoogd per commit naar master. Je kan de minor of major versie verhogen door in een commit message volgende string mee te geven:

- major: `+semver: major`
- minor: `+semver: minor`

Deze versie wordt gebruikt bij het publishen naar Expo.

> De app versie in de store komt uit het 'version' veld van app.json. Tijdens de GitHub action wordt deze waarde ingevuld. Je hoeft dus niks aan te passen.

## Licenses

Het licentiescherm wordt gemaakt op basis van `assets/licenses.json`. Om deze te updaten moet je het volgende commando gebruiker: `npm-license-crawler -onlyDirectDependencies -json assets/licenses.json`

## Conventions

### 1. Gebruik functionele componenten

Gebruik steeds functionele componenten tegenover class componenten. Voor functionele componenten gebruiken we volgende syntax:

```JSX
const Component = (props: PropType) => {
    const [counter, setCounter] = useState(0);

    return (
        <View>
        <Text>Hello World!</Text>
        </View>
    )
};

export default Component;
```

### 2. .tsx vs .ts

Gebruik de `.tsx` extensie wanneer de code JSX syntax bevat. Gebruik de `.ts` extensie wanneer het om 'pure' TypeScript gaat.
