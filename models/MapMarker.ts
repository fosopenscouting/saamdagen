import { LatLng } from 'react-native-maps';
import { PointOfInterest } from './PointOfInterest';

export interface MapMarker {
  title: string;
  description: string;
  latLng: LatLng;
}
