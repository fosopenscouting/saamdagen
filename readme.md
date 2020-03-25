# Saamdagen [![Build status](https://build.appcenter.ms/v0.1/apps/c8c2737c-9fdb-42aa-bb29-9f6ebcb95512/branches/master/badge)](https://appcenter.ms)

Android app voor de komende editie van Saamdagen.

Sterk gebaseerd op de open-source I/O 2018 app van Google.

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
