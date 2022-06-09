# Saamdagen

Android app voor de komende editie van Saamdagen.

De applicatie voor de editie van 2021 is geschreven in React Native met Expo.

## Setup/Running

### Installatie

- Node.js 12+ (dit installeert ook meteen npm)
- Yarn ( `npm install -g yarn`)
- Expo CLI (`npm install -g expo-cli`)
- Expo Go (iOS of Android app)

### Tooling

- VS Code is een goede optie om in te ontwikkelen. Bij het openen van deze repo in VS Code zal je ook een aantal suggesties krijgen voor handige extensies.
- React Native Directory: directory met third party libraries die compatibel zijn met React Native. <https://reactnative.directory/>

### Lokaal uitvoeren (development)

Voer deze commando's uit in de 'root' map. Dit is de map waarin het bestand 'package.json' zich bevindt.

- `$ yarn install` (enkel bij de eerste keer starten)
- `$ expo start`
- Scan de QR code die verschijnt met de Expo app

Zie de Expo documentatie voor meer info: <https://docs.expo.io/get-started/create-a-new-app/>

#### Uitvoeren in een emulator

1. Installeer en start een iOS en/of Android emulator
2. Volg de algemene stappen zoals hierboven beschreven
3. Kies, in het browserscherm dat opende na `expo start`te draaien, om de app te openen in een emulator naar keuze.

### Branching

**master:** Code zoals ze in productie is. Changes op deze branch triggeren een build en deploy

**saamdagen-2019:** App voor de editie van 2019. Deze versie wordt bewaard in een aparte branch omdat er tussen '19 en '20 volledig opnieuw werd begonnen.

**saamdagen-2020**: App voor de afgelaste editie van 2020. Deze applicatie werd nooit afgewerkt of gebruikt.

Push nooit direct naar de master branch, maar gebruik Pull Requests.

### CI/CD

Elke push naar master triggert een Expo Publish. Nieuwe versies worden standaard naar een staging release channel gereleased. Om te releasen naar productie is een approval nodig.

### UI design

<https://xd.adobe.com/view/1cef593f-f39e-4138-a5b5-217d87659aee-49bc/>

### Conventions

#### 1. Gebruik functionele componenten

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

#### 2. .tsx vs .ts

Gebruik de `.tsx` extensie wanneer de code JSX syntax bevat. Gebruik de `.ts` extensie wanneer het om 'pure' TypeScript gaat.
