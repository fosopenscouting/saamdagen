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
      description: `Aan het infopunt kan je terecht voor … info! Hier koop je ook jetons en bekers. Oordoppen of condooms nodig? Zit je met een vraag of zin in een babbel? Het infopunt is the place to be! Ook voor EHBO kan je hier terecht.

We werken met herbruikbare bekers. Voor €2 koop je een beker met bekerjeton aan. Het hele weekend maak je gebruik van je beker. Als je aan de bar een drankje koopt, geef je je beker af. Je krijgt een gevulde beker terug. Die beker gebruik je dan opnieuw als je een drankje haalt. Op het einde van het weekend kan je bij de uitcheck de €2 terugkrijgen als je een beker en een bekerjeton afgeeft. Draag dus goed zorg voor je bekerjeton.

Ook de overschot van je jetons kan je op het einde van het weekend inruilen voor geld.  `,
      latLng: {
        latitude: 51.200962,
        longitude: 4.85072,
      },
      layer: 'normal',
      icon: require('../assets/images/map-icons/icon-infopunt.png'),
    },
  ],
  [
    'Podium',
    {
      title: 'Podium',
      description:
        'Het hart van Saamdagen. De plaats waar alle ‘magic happens’.',
      latLng: {
        latitude: 51.201001,
        longitude: 4.851587,
      },
      layer: 'normal',
      icon: require('../assets/images/map-icons/icon-podium.png'),
    },
  ],
  [
    'Fuiftent',
    {
      title: 'Fuiftent',
      description:
        'De naam zegt het zelf. Een tent, hoe kan het ook anders, waarin vooral gedanst wordt.',
      latLng: {
        latitude: 51.2008,
        longitude: 4.850224,
      },
      layer: 'normal',
      icon: require('../assets/images/map-icons/icon-fuiftent.png'),
    },
  ],
  [
    'Kampvuur',
    {
      title: 'Kampvuur',
      description:
        'Ook wie op het gemak een drankje wil nuttigen en een babbeltje wil slaan, vindt op Saamdagen een plekje. Enkele FOS’sers zorgen voor een streepje muziek aan het kampvuur. In de rustige bar vind je ook een photobooth. Leg jullie herinneringen er vast op foto en neem meteen aan afgeprinte foto mee naar huis.  ',
      latLng: {
        latitude: 51.200161,
        longitude: 4.850385,
      },
      layer: 'normal',
      icon: require('../assets/images/map-icons/icon-kampvuur.png'),
    },
  ],
  [
    'Eettent',
    {
      title: 'Eettent',
      description: 'Njam',
      layer: 'normal',
      icon: require('../assets/images/map-icons/icon-eten.png'),
      latLng: {
        latitude: 51.200967,
        longitude: 4.851257,
      },
    },
  ],
  [
    'Markt',
    {
      title: 'Markt',
      description: '',
      layer: 'normal',
      latLng: {
        latitude: 51.200614,
        longitude: 4.85027,
      },
      icon: require('../assets/images/map-icons/icon-markt.png'),
    },
  ],
  [
    'Rustige bar',
    {
      title: 'Rustige bar',
      description: '',
      layer: 'normal',
      latLng: {
        latitude: 51.200389,
        longitude: 4.850433,
      },
      icon: require('../assets/images/map-icons/icon-rustige-bar.png'),
    },
  ],
  [
    'Sanitair',
    {
      title: 'Sanitair',
      layer: 'normal',
      latLng: {
        latitude: 51.201207,
        longitude: 4.850218,
      },
      icon: require('../assets/images/map-icons/icon-douche.png'),
      description: `Hier vind je:
      - Toiletten
      - Douches
      - Kraantjeswater`,
    },
  ],
  [
    'SanitairCamping',
    {
      title: 'Sanitair',
      layer: 'normal',
      latLng: {
        latitude: 51.202863,
        longitude: 4.849293,
      },
      icon: require('../assets/images/map-icons/icon-douche.png'),
      description: `Hier vind je:
      - Toiletten
      - Kraantjeswater`,
    },
  ],
  [
    'Camping',
    {
      title: 'Camping',
      layer: 'normal',
      icon: require('../assets/images/map-icons/icon-camping.png'),
      latLng: {
        latitude: 51.20285,
        longitude: 4.847783,
      },
    },
  ],
  [
    'Camping2',
    {
      title: 'Camping',
      layer: 'normal',
      icon: require('../assets/images/map-icons/icon-camping.png'),
      latLng: {
        latitude: 51.203845,
        longitude: 4.8487063,
      },
    },
  ],
  [
    'Camping3',
    {
      title: 'Camping',
      layer: 'normal',
      icon: require('../assets/images/map-icons/icon-camping.png'),
      latLng: {
        latitude: 51.203616,
        longitude: 4.85024,
      },
    },
  ],
  [
    '1',
    {
      title: 'Hoogteparcours EN zandkastelen en knikkerbanen',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.199612,
        longitude: 4.851292,
      },
      icon: require('../assets/images/map-icons/icon-1.png'),
      layer: 'activities',
    },
  ],
  [
    '2',
    {
      title: 'Techniekenspel',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.199807,
        longitude: 4.851271,
      },
      icon: require('../assets/images/map-icons/icon-2.png'),
      layer: 'activities',
    },
  ],
  [
    '3',
    {
      title: 'Buitenlandskamp voor dummies',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.199474,
        longitude: 4.850606,
      },
      icon: require('../assets/images/map-icons/icon-3.png'),
      layer: 'activities',
    },
  ],
  [
    '4',
    {
      title: 'Een conflict? Animeren is anticiperen',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.199548,
        longitude: 4.850928,
      },
      icon: require('../assets/images/map-icons/icon-4.png'),
      layer: 'activities',
    },
  ],
  [
    '5',
    {
      title: 'Afrikaans percussie',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.199444,
        longitude: 4.85119,
      },
      icon: require('../assets/images/map-icons/icon-5.png'),
      layer: 'activities',
    },
  ],
  [
    '6',
    {
      title: 'In time!',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.199763,
        longitude: 4.8506,
      },
      icon: require('../assets/images/map-icons/icon-6.png'),
      layer: 'activities',
    },
  ],
  [
    '7',
    {
      title: 'LEO verrast',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.199998,
        longitude: 4.850423,
      },
      icon: require('../assets/images/map-icons/icon-7.png'),
      layer: 'activities',
    },
  ],
  [
    '8',
    {
      title: 'Sjorren',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.20023,
        longitude: 4.850198,
      },
      icon: require('../assets/images/map-icons/icon-8.png'),
      layer: 'activities',
    },
  ],
  [
    '9',
    {
      title: 'Are you the one?',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.200385,
        longitude: 4.850466,
      },
      icon: require('../assets/images/map-icons/icon-9.png'),
      layer: 'activities',
    },
  ],
  [
    '10',
    {
      title: 'Ballen aan je lijf',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.200593,
        longitude: 4.850075,
      },
      icon: require('../assets/images/map-icons/icon-10.png'),
      layer: 'activities',
    },
  ],
  [
    '11',
    {
      title: 'Goed in je vel',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.200536,
        longitude: 4.851127,
      },
      icon: require('../assets/images/map-icons/icon-11.png'),
      layer: 'activities',
    },
  ],
  [
    '12',
    {
      title: 'Mocktails and partygames',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.200845,
        longitude: 4.850647,
      },
      icon: require('../assets/images/map-icons/icon-12.png'),
      layer: 'activities',
    },
  ],
  [
    '13',
    {
      title: 'Circustechnieken',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.200981,
        longitude: 4.850119,
      },
      icon: require('../assets/images/map-icons/icon-13.png'),
      layer: 'activities',
    },
  ],
  [
    '14',
    {
      title: 'Battle royal',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201138,
        longitude: 4.850639,
      },
      icon: require('../assets/images/map-icons/icon-14.png'),
      layer: 'activities',
    },
  ],
  [
    '15',
    {
      title: 'Kort maar krachtig',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201076,
        longitude: 4.85146,
      },
      icon: require('../assets/images/map-icons/icon-15.png'),
      layer: 'activities',
    },
  ],
  [
    '16',
    {
      title: 'Wij maken jouw dag (een stukje duurzamer)',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201082,
        longitude: 4.852013,
      },
      icon: require('../assets/images/map-icons/icon-16.png'),
      layer: 'activities',
    },
  ],
  [
    '17',
    {
      title: 'Gigantisch spel',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.20138,
        longitude: 4.85186,
      },
      icon: require('../assets/images/map-icons/icon-17.png'),
      layer: 'activities',
    },
  ],
  [
    '18',
    {
      title: 'Chaos 2.0',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201623,
        longitude: 4.852047,
      },
      icon: require('../assets/images/map-icons/icon-18.png'),
      layer: 'activities',
    },
  ],
  [
    '19',
    {
      title: 'Yoga',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.202175,
        longitude: 4.851189,
      },
      icon: require('../assets/images/map-icons/icon-19.png'),
      layer: 'activities',
    },
  ],
  [
    '20',
    {
      title: 'Zeescouts op het droge',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.202481,
        longitude: 4.851211,
      },
      icon: require('../assets/images/map-icons/icon-20.png'),
      layer: 'activities',
    },
  ],
  [
    '21',
    {
      title: 'Cluedo',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.20244,
        longitude: 4.85047,
      },
      icon: require('../assets/images/map-icons/icon-21.png'),
      layer: 'activities',
    },
  ],
  [
    '22',
    {
      title: 'Survivaltechnieken',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.20281,
        longitude: 4.850116,
      },
      icon: require('../assets/images/map-icons/icon-22.png'),
      layer: 'activities',
    },
  ],
  [
    '23',
    {
      title: 'Seniors begeleiden',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.202511,
        longitude: 4.849296,
      },
      icon: require('../assets/images/map-icons/icon-23.png'),
      layer: 'activities',
    },
  ],
  [
    '24',
    {
      title: 'Het niet zo eerlijke levenswegspel',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201909,
        longitude: 4.850052,
      },
      icon: require('../assets/images/map-icons/icon-24.png'),
      layer: 'activities',
    },
  ],
  [
    '25',
    {
      title: 'Kinderen met specifieke noden',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201587,
        longitude: 4.850325,
      },
      icon: require('../assets/images/map-icons/icon-25.png'),
      layer: 'activities',
    },
  ],
  [
    '26',
    {
      title: 'Scouting is kicken',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201449,
        longitude: 4.849998,
      },
      icon: require('../assets/images/map-icons/icon-26.png'),
      layer: 'activities',
    },
  ],
  [
    '27',
    {
      title: 'Genderinclusief scouten, hoe doe je dat?',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201822,
        longitude: 4.849542,
      },
      icon: require('../assets/images/map-icons/icon-27.png'),
      layer: 'activities',
    },
  ],
  [
    '28',
    {
      title: 'Op tocht door FOS Open Scouting',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201704,
        longitude: 4.849226,
      },
      icon: require('../assets/images/map-icons/icon-28.png'),
      layer: 'activities',
    },
  ],
  [
    '29',
    {
      title: 'Grab ‘m by the pussy',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201324,
        longitude: 4.849692,
      },
      icon: require('../assets/images/map-icons/icon-29.png'),
      layer: 'activities',
    },
  ],
  [
    '30',
    {
      title: 'Evalueren kan je leren',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201227,
        longitude: 4.849017,
      },
      icon: require('../assets/images/map-icons/icon-30.png'),
      layer: 'activities',
    },
  ],
  [
    '31',
    {
      title: 'Overtuigen en werven',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201644,
        longitude: 4.848625,
      },
      icon: require('../assets/images/map-icons/icon-31.png'),
      layer: 'activities',
    },
  ],
  [
    '32',
    {
      title: 'EHBE',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.201983,
        longitude: 4.848764,
      },
      icon: require('../assets/images/map-icons/icon-32.png'),
      layer: 'activities',
    },
  ],
  [
    '33',
    {
      title: 'Vergadertechnieken',
      description:
        'Ouder dan 12 jaar maar toch nog zin om zandkastelen te bouwen en knikkerraces te houden? Op Saamdagen kan het!',
      latLng: {
        latitude: 51.202165,
        longitude: 4.848153,
      },
      icon: require('../assets/images/map-icons/icon-33.png'),
      layer: 'activities',
    },
  ],
  [
    'G1',
    {
      title: 'Teamwork',
      latLng: {
        latitude: 51.200168,
        longitude: 4.850508,
      },
      layer: 'big_game',
    },
  ],
  [
    'G2',
    {
      title: 'Eindspel',
      latLng: {
        latitude: 51.200612,
        longitude: 4.850154,
      },
      layer: 'big_game',
    },
  ],
  [
    'G3',
    {
      title: 'Creativiteit',
      latLng: {
        latitude: 51.201086,
        longitude: 4.851479,
      },
      layer: 'big_game',
    },
  ],
  [
    'G4',
    {
      title: 'Snelheid',
      latLng: {
        latitude: 51.201533,
        longitude: 4.850138,
      },
      layer: 'big_game',
    },
  ],
  [
    'G5',
    {
      title: 'Intelligentie',
      latLng: {
        latitude: 51.202104,
        longitude: 4.851667,
      },
      layer: 'big_game',
    },
  ],
  [
    'G6',
    {
      title: 'Listigheid',
      latLng: {
        latitude: 51.202743,
        longitude: 4.850631,
      },
      layer: 'big_game',
    },
  ],
  [
    'G7',
    {
      title: 'Kracht',
      latLng: {
        latitude: 51.203512,
        longitude: 4.850433,
      },
      layer: 'big_game',
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
    {
      startTime: new Date(2021, 9, 26, 8, 30),
      name: 'Opstaan',
      description: `Good morning!`,
    },
    {
      startTime: new Date(2021, 9, 26, 9),
      endTime: new Date(2021, 9, 26, 10, 30),
      name: 'Brunch',
      location: 'Eettent',
      description: `We genieten samen van een uitgebreide brunch.Good morning!`,
    },
    {
      startTime: new Date(2021, 9, 26, 10),
      endTime: new Date(2021, 9, 26, 12),
      name: 'Markt',
      location: 'Markt',
      description: `Kom het aanbod van FOS Open Scouting, Wegwijzer, JEKA, Mooimakers, Jint, Bouworde, de Aanstokerij, Tumult ... te weten.

SPEL: Wie weet ga jij wel naar huis met een gratis ticket voor Saamdagen 2022!  `,
    },
    {
      startTime: new Date(2021, 9, 26, 12, 15),
      name: 'Verzamelen',
      location: 'Podium',
      description: ``,
    },
    {
      startTime: new Date(2021, 9, 26, 12, 30),
      endTime: new Date(2021, 9, 26, 14),
      name: 'Opkuis',
      description: `We steken met z’n allen de handen uit de mouwen en zorgen ervoor dat de Brink er weer netjes bijligt. `,
    },
    {
      startTime: new Date(2021, 9, 26, 14),
      endTime: new Date(2021, 9, 26, 14, 30),
      name: 'Tenten opruimen',
      description: `Na de grote opkuis, plooit iedereen z’n tent weer op en maken we ons klaar voor vertrek.`,
    },
    {
      startTime: new Date(2021, 9, 26, 14, 30),
      name: 'Snack',
      description: `Bij vertrek krijgt iedereen een hotdog uit het vuistje.  `,
    },
    {
      startTime: new Date(2021, 9, 26, 14, 30),
      name: 'Uitcheck',
      description: `Het zit er helaas weer op. Tot volgend jaar!

Je kan bij de uitcheck je overige jetons inruilen voor geld. Ook je beker met bekerjeton ruil je hier weer in.`,
    },
  ];
};

export const getHomeScreenSections = (): HomeScreenSection[] => {
  return [
    {
      title: 'Welkom op Saamdagen!',
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
