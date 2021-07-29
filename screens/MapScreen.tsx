import React, { useState, useRef, useMemo } from 'react';
import { View } from '../components/Themed';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { MapMarker } from '../models/MapMarker';
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { getMapMarkers } from '../services/DataService';
import MapDetail from '../components/Map/MapDetail';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const MapScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const [selectedMarker, setSelectedMarker] = useState<MapMarker>();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const mapRegion: Region = {
    latitude: 51.200977,
    longitude: 4.850671,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const markers: MapMarker[] = getMapMarkers();

  const onMapReady = async () => {
    await Location.requestForegroundPermissionsAsync();
  };

  const onMarkerSelect = useCallback((markerIdentifier: string) => {
    const markerObject = markers.find((x) => x.id == markerIdentifier);
    setSelectedMarker(markerObject);

    sheetRef.current?.snapTo(0);
  }, []);

  const handleMapPress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        showsUserLocation={true}
        minZoomLevel={16}
        showsMyLocationButton
        toolbarEnabled={false}
        onMapReady={onMapReady}
        onPress={handleMapPress}
      >
        {markers.map((marker, index) => (
          <Marker
            onPress={(e) => {
              e.stopPropagation();
              onMarkerSelect(e.nativeEvent.id);
            }}
            key={index}
            coordinate={marker.latLng}
            identifier={marker.id}
          />
        ))}
      </MapView>
      {selectedMarker ? (
        <BottomSheet
          backgroundComponent={View}
          ref={sheetRef}
          snapPoints={snapPoints}
        >
          {selectedMarker ? (
            <MapDetail
              title={selectedMarker?.title}
              description={selectedMarker?.description}
            />
          ) : null}
        </BottomSheet>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
