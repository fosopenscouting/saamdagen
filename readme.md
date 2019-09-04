# Saamdagen [![Build status](https://build.appcenter.ms/v0.1/apps/c8c2737c-9fdb-42aa-bb29-9f6ebcb95512/branches/master/badge)](https://appcenter.ms)

Android app voor de komende editie van Saamdagen.

Sterk gebaseerd op de open-source I/O 2018 app van Google.

## Setup

### Environment variables

Om de app te runnen moet een environment variable ingesteld worden met de API key van Microsoft app center.

Gebruik je eigen Google Fu om de variabelen te persisteren over reboots en sessies ;)

#### Windows

´setx APP_CENTER_KEY "<APP_CENTER_KEY>"´

#### Unix

´export APP_CENTER_KEY=<APP_CENTER_KEY>´

## Data

### Info, agenda en activiteiten

Alle data voor info, agenda en activiteiten bevindt zich in ´resources/saamdagen_data.json´.

1. blocks

Dit zijn alle agenda items.

Voorbeeld:

```json
 {
      "title":"Check-in",
      "startTime": "2019-09-27 19:00",
      "endTime": "2019-09-27 20:00",
      "color": "#c9db2e",
      "strokeColor": "#c9db2e",
      "isDark": false,
      "type": "other" //Aan de hand van dit type wordt het icoontje voor het item bepaald.

    }
```

Icoontjes voor agenda items worden gemapt in ´ScheduleItemBindingAdapter´

2. sessions

Alle data voor de activiteiten en workshops.

Voorbeeld:

```json
 { "title": "Survival cooking",
      "description": "Dingen op het vuur smijten",
      "type": "activiteit", //Kan activiteit of workshop zijn.
      "location": "TBD"
    }
```

3. info

Alle data voor het info scherm.

Voorbeeld:

```json
 {
      "title": "Check-in",
      "content": "Welkom vanaf 19u in Puyenbroeck"
    }
```