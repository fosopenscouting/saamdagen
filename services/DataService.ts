import { MapMarker } from '../models/MapMarker';

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
