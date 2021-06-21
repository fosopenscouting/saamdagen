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

VS Code is een goede optie om in te ontwikkelen. Bij het openen van deze repo in VS Code zal je ook een aantal suggesties krijgen voor handige extensies.

### Lokaal uitvoeren (development)

Voer deze commando's uit in de 'root' map. Dit is de map waarin het bestand 'package.json' zich bevindt.

- `$ expo start`
- Scan de QR code die verschijnt met de Expo app

Zie de Expo documentatie voor meer info: <https://docs.expo.io/get-started/create-a-new-app/>

### Branching

**master:** Code zoals ze in productie is. Changes op deze branch triggeren een build en deploy

**saamdagen-2019:** App voor de editie van 2019. Deze versie wordt bewaard in een aparte branch omdat er tussen '19 en '20 volledig opnieuw werd begonnen.

**saamdagen-2020**: App voor de afgelaste editie van 2020. Deze applicatie werd nooit afgewerkt of gebruikt.

Push nooit direct naar de master branch, maar gebruik Pull Requests.

### CI/CD

Elke push/merge naar de **master** branch triggert een build en deploy naar app.saamdagen.be. Aanvullend bij de build, wordt ook **ng lint** uitgevoerd. De applicatie wordt gehost op Azure in een 'Static Web App'.

Pull Requests naar master triggeren ook een build. Deze wordt ook gedeployed naar een tijdelijke omgeving waar je je changes kan (laten) valideren vooraleer er gemerged wordt naar master.

### UI design

<https://xd.adobe.com/view/1cef593f-f39e-4138-a5b5-217d87659aee-49bc/>