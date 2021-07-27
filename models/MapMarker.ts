import { LatLng } from 'react-native-maps';

export interface MapMarker {
  id: string;
  title: string;
  description: string;
  latLng: LatLng;
}