import React from 'react';
import MapView, {
  Coordinate,
  Region,
  PROVIDER_GOOGLE,
  Overlay,
} from 'react-native-maps';
import * as Location from 'expo-location';
import OverlayImage from '../../assets/images/baselayer.png';
import { getMapStyle } from '../../services/DataService';
import Markers from './Markers';
import { MapMarker } from '../../models/MapMarker';
import { StyleSheet } from 'react-native';

type Props = {
  markers: MapMarker[] | undefined;
  onMarkerSelect: (markerId: string) => void;
  onMapsPress: () => void;
};

const Map: React.FC<Props> = (props: Props) => {
  const OVERLAY_TOP_LEFT_COORDINATE: Coordinate = [51.205039, 4.842844];
  const OVERLAY_BOTTOM_RIGHT_COORDINATE: Coordinate = [51.205039, 4.856122];
  console.log('render map ');

  const mapRegion: Region = {
    latitude: 51.200977,
    longitude: 4.850671,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const onMapReady = async () => {
    await Location.requestForegroundPermissionsAsync();
  };

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={mapRegion}
      showsUserLocation={true}
      minZoomLevel={17}
      moveOnMarkerPress={false}
      showsPointsOfInterest={false}
      toolbarEnabled={false}
      onMapReady={onMapReady}
      onPress={props.onMapsPress}
      customMapStyle={getMapStyle()}
    >
      <Overlay
        bounds={[OVERLAY_TOP_LEFT_COORDINATE, OVERLAY_BOTTOM_RIGHT_COORDINATE]}
        image={OverlayImage}
      />
      {props.markers ? (
        <Markers
          markers={props.markers}
          handleMarkerSelect={props.onMarkerSelect}
        />
      ) : null}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
