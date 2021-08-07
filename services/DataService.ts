import { MapMarker } from '../models/MapMarker';
import { PointOfInterest } from '../models/PointOfInterest';
import { ScheduleData } from '../models/ScheduleData';

const markers = new Map<PointOfInterest, MapMarker>([
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
]);

export const getMapMarkers = (): Map<PointOfInterest, MapMarker> => {
  return markers;
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
