import { MapStyleElement } from 'react-native-maps';
import { MapLayer } from '../models/MapLayer';
import { MapMarker } from '../models/MapMarker';
import { PointOfInterest } from '../models/PointOfInterest';

/*const markers = new Map<PointOfInterest | string, MapMarker>([

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
      description: 'Hier slaat iedereen z’n tentje op.',
    },
  ],
  [
    '1',
    {
      title: 'Hoogteparcours EN zandkastelen en knikkerbanen',
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
      title: 'Psychisch welzijn - Rode Kruis',

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
]);*/

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
