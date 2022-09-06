import React from 'react';
import { MapMarker } from '../../models/MapMarker';
import { Marker } from 'react-native-maps';
import { markerImages } from '../../constants/ImageMap';

type MarkerProps = {
  markers: MapMarker[];
  handleMarkerSelect: (e: string) => void;
};
const Markers: React.FC<MarkerProps> = (props: MarkerProps) => {
  return (
    <>
      {props.markers?.map((item) => (
        <Marker
          onPress={(e) => {
            e.stopPropagation();
            props.handleMarkerSelect(e.nativeEvent.id as string);
          }}
          key={item.id}
          coordinate={item.latLng}
          identifier={item.title}
          icon={markerImages[item.icon as keyof typeof markerImages]}
        />
      ))}
    </>
  );
};

export default Markers;
