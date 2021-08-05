import { MapMarker } from '../models/MapMarker';
import { ScheduleData } from '../models/ScheduleData';

export const getMapMarkers = (): MapMarker[] => {
  return [
    {
      id: 'infopunt',
      title: 'Infopunt',
      description: 'Vind hier alle info die je nodig hebt!',
      latLng: {
        latitude: 51.200974,
        longitude: 4.850735,
      },
    },
    {
      id: 'podium',
      title: 'Podium',
      description: 'Helemaal loos!',
      latLng: {
        latitude: 51.201108,
        longitude: 4.851519,
      },
    },
  ];
};

export const getScheduleData = (): ScheduleData[] => {
  return [
    {
      startTime: new Date(2021, 9, 24, 20),
      endTime: undefined,
      location: 'infopunt',
      name: 'Incheck',
      description: "Inchecken met de saamdagen app!" 
    },
    {
      startTime: new Date(2021, 9, 24, 21),
      endTime: new Date(2021, 9, 24, 22),
      location: 'podium',
      name: 'PodiumShow',
      description: "Sfeer met team saamdagen!"
    },
    {
      startTime: new Date(2021, 9, 24, 22),
      endTime: new Date(2021, 9, 25, 2),
      location: 'podium',
      name: 'White Shoes',
      description: "Leef je helemaal uit met deze party band"
    },
    {
      startTime: new Date(2021, 9, 24, 22),
      endTime: new Date(2021, 9, 25, 2),
      location: 'fuiftent',
      name: 'Silent Disco',
      description: "Losgaan"
    },
    {
      startTime: new Date(2021, 9, 24, 22, 30),
      endTime: new Date(2021, 9, 25, 4),
      location: 'kampvuur',
      name: 'Kampvuur',
      description: "Kamperen is de mooiste zomersport"
    },
    {
      startTime: new Date(2021, 9, 24, 23),
      endTime: new Date(2021, 9, 25, 4),
      location: 'test',
      name: 'Scroll Test',
      description: "Kamperen is de mooiste zomersport"
    }
  ]
}