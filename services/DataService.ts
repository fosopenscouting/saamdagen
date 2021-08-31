import { HomeScreenSection } from '../models/HomeScreenSection';
import { MapStyleElement } from 'react-native-maps';
import { MapLayer } from '../models/MapLayer';
import { MapMarker } from '../models/MapMarker';
import { PointOfInterest } from '../models/PointOfInterest';
import { ScheduleData } from '../models/ScheduleData';

const markers = new Map<PointOfInterest | string, MapMarker>([
  [
    'Infopunt',
    {
      title: 'Infopunt',
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
    'Fuiftent',
    {
      title: 'Fuiftent',
      description: 'Ook hier helemaal loos!',
      latLng: {
        latitude: 51.2005331,
        longitude: 4.8502755,
      },
      layer: 'normal',
    },
  ],
  [
    'Kampvuur',
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
    'Eettent',
    {
      title: 'Eettent',
      description: 'Njam',
      layer: 'normal',
      latLng: {
        latitude: 51.2005331,
        longitude: 4.8502755,
      },
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
      endTime: new Date(2021, 9, 24, 0),
      location: 'Infopunt',
      name: 'Incheck',
      description: `Voor de incheck houd je 3 zaken klaar:

1. Ticket Saamdagen. Via de QR-code op je ticket of via deze app.

2. COVID Safe Ticket. Alle info vind je hier.

3. Een identiteitsbewijs.

Op Saamdagen is het niet toegestaan eigen drank mee te brengen.  `,
    },
    {
      startTime: new Date(2021, 9, 24, 21, 30),
      endTime: new Date(2021, 9, 24, 3),
      location: 'Kampvuur',
      name: 'Kampvuur',
      description: `De hele avond lang kan je genieten van een gezellig kampvuur aan de rustige bar. Op tijd en stond vind je er FOSsers die voor een streepje muziek zorgen.  `,
    },
    {
      startTime: new Date(2021, 9, 24, 22),
      endTime: new Date(2021, 9, 24, 0),
      location: 'Eettent',
      name: 'Snack',
      description: `Aan de eettent is voor iedereen een hamburger voorzien.`,
    },
    {
      startTime: new Date(2021, 9, 24, 22),
      endTime: new Date(2021, 9, 24, 2),
      location: 'Podium',
      name: 'Show + DJ',
      description: `Een bende sfeermakers zorgt voor een 'welkom-terug-feestje'.`,
    },
    {
      startTime: new Date(2021, 9, 24, 22),
      endTime: new Date(2021, 9, 24, 2),
      location: 'Fuiftent',
      name: 'Silent Disco',
      description: `Switch tussen verschillende dj's op zoek naar de beste dansplaatjes. Haal je dansbenen maar boven!

We ontvangen elk half uur 150 dansers in de silent disco.`,
    },
    {
      startTime: new Date(2021, 9, 24, 3),
      name: 'Einde',
      description: `Na een eerste geslaagde avond ronden we af om 03:00.`,
    },
    {
      startTime: new Date(2021, 9, 25, 8),
      location: 'Camping',
      name: 'Opstaan',
      description: `Good morning!`,
    },
    {
      startTime: new Date(2021, 9, 25, 8, 15),
      endTime: new Date(2021, 9, 25, 9, 15),
      location: 'Eettent',
      name: 'Ontbijt',
      description: `We genieten samen van een hartig ontbijt.`,
    },
    {
      startTime: new Date(2021, 9, 25, 9, 30),
      location: 'Podium',
      name: 'Verzamelen',
      description: `Verzamelen voor de eerste workshops en activiteiten.`,
    },
    {
      startTime: new Date(2021, 9, 25, 9, 45),
      endTime: new Date(2021, 9, 25, 11, 45),
      name: 'Workshops en activiteiten',
      description: `We dompelen je onder in leerrijke workshops en ontspannende activiteiten.

Bij je inschrijving koos je voor een activiteit en workshop. Check via Mijn Saamdagen op deze app hoe jouw programma eruitziet.`,
    },
    {
      startTime: new Date(2021, 9, 25, 12),
      endTime: new Date(2021, 9, 25, 13, 15),
      location: 'Eettent',
      name: 'Lunch',
      description: `Belegde broodjes voor iedereen!`,
    },
    {
      startTime: new Date(2021, 9, 25, 13, 30),
      location: 'Podium',
      name: 'Verzamelen',
      description: `Verzamelen voor de tweede sessie workshops en activiteiten.`,
    },
    {
      startTime: new Date(2021, 9, 25, 12, 45),
      endTime: new Date(2021, 9, 25, 15, 45),
      name: 'Workshops en activiteiten',
      description: `We dompelen je onder in leerrijke workshops en ontspannende activiteiten.

Bij je inschrijving koos je voor een activiteit en workshop. Check via Mijn Saamdagen op deze app hoe jouw programma eruitziet.`,
    },
    {
      startTime: new Date(2021, 9, 25, 15, 45),
      endTime: new Date(2021, 9, 25, 16, 15),
      name: 'Vieruurtje',
      location: 'Eettent',
      description: `Voor de kleine honger.`,
    },
    {
      startTime: new Date(2021, 9, 25, 16, 15),
      endTime: new Date(2021, 9, 25, 18, 30),
      name: 'Groot spel',
      location: 'Podium',
      description: `Tijd voor wat actie. De eenheden nemen het tegen elkaar op in de Highland Games. Welke clan kroont zich tot winnaar?`,
    },
    {
      startTime: new Date(2021, 9, 25, 20, 15),
      name: 'Verzamelen',
      location: 'Podium',
      description: ``,
    },
    {
      startTime: new Date(2021, 9, 25, 20, 15),
      endTime: new Date(2021, 9, 25, 21),
      name: 'Intro & Speech FV',
      location: 'Podium',
      description: `We verzamelen aan het podium voor de bekroning van het groot spel, de aftermovie van de kampenzomer, de aankondiging van het nieuwe jaarthema en een woordje van de Federaal Verantwoordelijke`,
    },
    {
      startTime: new Date(2021, 9, 25, 21),
      endTime: new Date(2021, 9, 25, 22, 30),
      name: 'Band',
      location: 'Podium',
      description: `Broken Bottle Big Band zorgt voor de leukste hitjes en zetten de Brink in vuur en vlam. Ze nemen jullie mee op een trip door reggae, hip hop, the 90s, salsa, drum 'n bass ... Noem maar op! `,
    },
    {
      startTime: new Date(2021, 9, 25, 21),
      endTime: new Date(2021, 9, 25, 4),
      name: 'Kampvuur',
      location: 'Kampvuur',
      description: `De hele avond lang kan je genieten van een gezellig kampvuur aan de rustige bar. Op tijd en stond vind je er FOSsers die voor een streepje muziek zorgen.`,
    },
    {
      startTime: new Date(2021, 9, 25, 22, 30),
      endTime: new Date(2021, 9, 25, 3),
      name: 'Fuif',
      location: 'Fuiftent',
      description: `Op zaterdagavond doen we de fuiftent daveren. Vergeet je dansschoenen niet!`,
    },
    {
      startTime: new Date(2021, 9, 25, 23),
      endTime: new Date(2021, 9, 25, 2),
      name: 'Snack',
      description: `Stil je nachtelijke honger met een paar loempia’s (te betalen met jetons).`,
    },
    {
      startTime: new Date(2021, 9, 25, 4),
      name: 'Einde',
      description: `Op dag 2 zoeken we ons bed op rond 04:00.`,
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
