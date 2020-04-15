# Saamdagen

Android app voor de komende editie van Saamdagen.

De applicatie voor de editie van 2020 is een Angular PWA zodat deze beschikbaar is voor apparaten van alle geuren en kleuren.

## Setup/Running

### Installatie

- Node.js
- Angular CLI (`$ npm install -g @angular/cli`)

### Lokaal uitvoeren (development)

- `$ npm install`
- `$ npm start`

### PWA functionaliteit testen

Door `ng serve` uit te voeren wordt de PWA functionaliteit niet 'geactiveerd'. Daarvoor moet er een productie build gemaakt worden. Die moet vervolgens geserved worden door een http server.

- `$ npm install -g http-server` (eenmalig)
- `$ ng build --prod`
- `$ http-server -c-1 dist/saamdagen`

### Branching

**develop:** Hoofdbranch om nieuwe features naar te pushen

**master:** Code zoals ze in productie is. Changes op deze branch triggeren een build en deploy

**saamdagen-2019:** App voor de editie van 2019. Deze versie wordt bewaard in een aparte branch omdat er tussen '19 en '20 volledig opnieuw werd begonnen.
