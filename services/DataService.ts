import { HomeScreenSection } from '../models/HomeScreenSection';
import { MapStyleElement } from 'react-native-maps';
import { MapLayer } from '../models/MapLayer';
import { MapMarker } from '../models/MapMarker';
import { PointOfInterest } from '../models/PointOfInterest';
import { ScheduleData } from '../models/ScheduleData';

const markers = new Map<PointOfInterest | string, MapMarker>([
  [
    'InfoPunt',
    {
      title: 'Info Punt',
      description: 'Vind hier alle info die je nodig hebt!',
      latLng: {
        latitude: 51.200974,
        longitude: 4.850735,
      },
      layer: 'normal',
      icon: require('../assets/images/map-icons/icon-infopunt.png'),
    },
  ],
  [
    'Podium',
    {
      title: 'Podium',
      description: 'Helemaal loos!',
      latLng: {
        latitude: 51.201108,
        longitude: 4.851519,
      },
      layer: 'normal',
    },
  ],
  [
    'FuifTent',
    {
      title: 'Fuif Tent',
      description: 'Ook hier helemaal loos!',
      latLng: {
        latitude: 51.2005331,
        longitude: 4.8502755,
      },
      layer: 'normal',
    },
  ],
  [
    'KampVuur',
    {
      title: 'Kampvuur',
      description: 'Vrolijke vrolijke vrienden',
      latLng: {
        latitude: 51.2005331,
        longitude: 4.8502755,
      },
      layer: 'normal',
    },
  ],
  [
    '1',
    {
      title: 'Boogschieten',
      description: 'Hunger Games vibes',
      latLng: {
        latitude: 51.202028,
        longitude: 4.848857,
      },
      icon: require('../assets/images/map-icons/icon-1.png'),
      layer: 'activities',
    },
  ],
]);

export const getMapMarkers = (
  layer: MapLayer,
): Map<PointOfInterest | string, MapMarker> => {
  const filteredMarkers = new Map();
  markers.forEach((value, key) => {
    if (value.layer === layer) {
      filteredMarkers.set(key, value);
    }
  });
  return filteredMarkers;
};

export const getScheduleData = (): ScheduleData[] => {
  return [
    // Vrijdag
    {
      startTime: new Date(2021, 9, 24, 20),
      endTime: undefined,
      location: 'InfoPunt',
      name: 'Incheck',
      description: 'Inchecken met de saamdagen app!',
    },
    {
      startTime: new Date(2021, 9, 24, 21),
      endTime: new Date(2021, 9, 24, 22),
      location: 'Podium',
      name: 'Podium Show',
      description: 'Sfeer met team saamdagen!',
    },
    {
      startTime: new Date(2021, 9, 24, 22),
      endTime: new Date(2021, 9, 25, 2),
      location: 'Podium',
      name: 'White Shoes',
      description: 'Leef je helemaal uit met deze party band',
    },
    {
      startTime: new Date(2021, 9, 24, 22),
      endTime: new Date(2021, 9, 25, 2),
      location: 'FuifTent',
      name: 'Silent Disco',
      description:
        'Laat je volledig gaan met een Silent Disco. Ook dit jaar een beperkte capaciteit. Ieder halfuur een nieuw feestje: Snel pieken is de opdracht! DJ Rabeat, DJ Bowti en Twomey Tunes verzorgen jullie avond in stijl!',
    },
    {
      startTime: new Date(2021, 9, 24, 22, 30),
      endTime: new Date(2021, 9, 25, 4),
      location: 'KampVuur',
      name: 'Kampvuur',
      description: 'Kamperen is de mooiste zomersport',
    },
    // Zaterdag
    {
      startTime: new Date(2021, 9, 25, 9, 30),
      endTime: new Date(2021, 9, 25, 11, 45),
      location: 'Podium',
      name: 'Groot Spel',
      description: 'Kom naar het podium voor het groot spel.',
    },
    {
      startTime: new Date(2021, 9, 25, 12),
      endTime: new Date(2021, 9, 25, 13),
      location: 'Podium',
      name: 'Lunch',
      description: 'Eten',
    },
    {
      startTime: new Date(2021, 9, 25, 13, 30),
      endTime: new Date(2021, 9, 25, 18),
      location: 'Podium',
      name: 'Activiteiten',
      description: '',
    },
    {
      startTime: new Date(2021, 9, 25, 18),
      endTime: new Date(2021, 9, 25, 19, 45),
      location: 'KampVuur',
      name: 'Avondmaal',
      description: 'Eten',
    },
    {
      startTime: new Date(2021, 9, 25, 20, 15),
      endTime: new Date(2021, 9, 25, 20, 40),
      location: 'Podium',
      name: 'Podium Show',
      description: 'Slot van het groot spel',
    },
    {
      startTime: new Date(2021, 9, 25, 20, 40),
      endTime: new Date(2021, 9, 25, 20, 50),
      location: 'Podium',
      name: 'Speech FV',
      description: 'Bingo?',
    },
    {
      startTime: new Date(2021, 9, 25, 20, 50),
      endTime: new Date(2021, 9, 25, 22, 20),
      location: 'Podium',
      name: 'Maiskie Molie',
      description: "Rock 'n Roll!",
    },
  ];
};

export const getHomeScreenSections = (): HomeScreenSection[] => {
  return [
    {
      title: 'Welkom op Saamdagen',
      content: `Saamdagen is terug!
We hebben er even op moeten wachten maar geduld wordt beloond.
Maak je klaar voor een legendarisch editie.
Samen trekken we het scoutsjaar op gang. 
Kom mee genieten van een streepje muziek, activiteiten, vormingen, bars en vooral heel wat gezelligheid!`,
    },
    {
      title: 'Saamregels',
      content: `1. Neem actief deel aan het programma
2. Rook enkel in de rookzones
3. Heb respect voor de nachtrust van anderen
4. Gebruik, bezit of deal geen drugs
5. Neem geen eigen drank mee en kom niet onder invloed aan
6. Ga verantwoordelijk om met het consumeren van alcohol`,
    },
    {
      title: 'COVID Safe',
      content: `Enkel personen die kunnen aantonen dat ze het volledige weekend - vrijdagavond 24/09 tot en met zondag 26/09 - ‘safe’ zijn, krijgen toegang. Dat komt neer op het kunnen voorleggen van:

Een vaccinatiecertificaat. Dat wil zeggen dat je meer dan 2 weken volledig gevaccineerd bent.

Een herstelcertificaat van minder dan 6 maanden.

Een negatieve PCR-test die het volledige weekend geldig is. Een PCR-test is geldig op de dag van de test en 48 uur later. De negatieve PCR-test moet dus afgenomen zijn op vrijdag 24/09.

Opgelet! Noch een negatief resultaat van een antigeen- of sneltest, noch een negatieve PCR-test ouder dan vrijdag 24/09 zijn voldoende om toegang te krijgen.

Aan de ingang vragen we naar je identiteitskaart en je COVID Safe Ticket.

Aan de ingang zijn de afstands- en mondmaskerregels nog van toepassing. Zorg dus dat je een mondmasker bijhebt. Vanaf dat je het terrein van de Brink betreedt, draag je een mondmasker en houd je rekening met de afstandsregels. Van zodra je COVID Safe Ticket werd ingescand en je toegang krijgt tot het terrein mag je mondmasker af en ben je welkom in het rijk der vrijheid.

Meer info via https://fosopenscouting.be/nl/covid-safe-ticket `,
    },
    {
      title: 'Vragen of problemen',
      content: `Met vragen of problemen kan je steeds terecht bij het infopunt. De openingsuren van het infopunt vind je bij het programma. De medewerkers van sfeerbeheer staan ook altijd voor je klaar. Trek gerust aan hun mouw. `,
    },
    {
      title: 'Jetons en herbruikbare bekers',
      content: `Op Saamdagen werken we met jetons. Daarmee betaal je jouw drankjes en eventueel een hapje voor de extra honger. Je koopt jetons aan bij het infopunt. Er zijn 2 soorten jetons:

Vierkante jeton = €1 = niet-alcoholhoudende dranken

Ronde jeton = 1,5€ = alcoholhoudende dranken

We werken met herbruikbare bekers. Voor €2 koop je een beker met bekerjeton aan. Het hele weekend maak je gebruik van je beker. Als je aan de bar een drankje koopt, geef je je beker af. Je krijgt een gevulde beker terug. Die beker gebruik je dan opnieuw als je een drankje haalt. Op het einde van het weekend kan je bij de uitcheck de €2 terugkrijgen als je een beker en een bekerjeton afgeeft. Draag dus goed zorg voor je bekerjeton.

Ook de overschot van je jetons kan je op het einde van het weekend inruilen voor geld.  `,
    },
  ];
};

export const getMapStyle = (): MapStyleElement[] => {
  return [
    {
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];
};
