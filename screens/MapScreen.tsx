import React, { useState, useRef, useMemo } from 'react';
import { View, Text } from '../components/Themed';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { MapMarker } from '../models/MapMarker';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useCallback } from 'react';

const MapScreen: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker>();
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const mapRegion: Region = {
    latitude: 51.200977,
    longitude: 4.850671,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const markers: MapMarker[] = [
    {
      id: 'infopunt',
      title: 'Infopunt',
      description: 'Vind hier alle info die je nodig hebt!',
      latLng: {
        latitude: 51.200974,
        longitude: 4.850735,
      },
    },
  ];

  const onMapReady = async () => {
    await Location.requestForegroundPermissionsAsync();
  };

  const onMarkerSelect = useCallback((markerIdentifier: string) => {
    const markerObject = markers.find((x) => x.id == markerIdentifier);
    setSelectedMarker(markerObject);
    sheetRef.current?.present();
  }, []);

  const handleMapPress = useCallback(() => {
    sheetRef.current?.dismiss();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider="google"
          region={mapRegion}
          showsUserLocation={true}
          // minZoomLevel={16}
          showsMyLocationButton
          toolbarEnabled={false}
          onMapReady={onMapReady}
          onPress={handleMapPress}
        >
          {markers.map((marker, index) => (
            <Marker
              onPress={(e) => onMarkerSelect(e.nativeEvent.id)}
              key={index}
              coordinate={marker.latLng}
              identifier={marker.id}
            />
          ))}
        </MapView>
        <BottomSheetModal ref={sheetRef} snapPoints={snapPoints}>
          <View style={styles.markerDetail}>
            <Text style={styles.title}>{selectedMarker?.title}</Text>
            <Text>{selectedMarker?.description}</Text>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerDetail: {
    backgroundColor: 'transparent',
    padding: 16,
  },
});

export default MapScreen;
