import { LatLng } from 'react-native-maps';
import { IOrderable } from './IOrderable';
import { MapLayer } from './MapLayer';
export interface MapMarker extends IOrderable {
  id: string;
  title: string;
  description?: string;
  latLng: LatLng;
  layer: MapLayer;
  icon: string;
}
