import { LatLng } from 'react-native-maps';
import { MapLayer } from './MapLayer';
export interface MapMarker {
  title: string;
  description: string;
  latLng: LatLng;
  layer: MapLayer;
}
