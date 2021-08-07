import React, { useState, useRef, useMemo } from 'react';
import { View } from '../components/Themed';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { MapMarker } from '../models/MapMarker';
import BottomSheet from '@gorhom/bottom-sheet';
import { getMapMarkers } from '../services/DataService';
import MapDetail from '../components/Map/MapDetail';
import { PointOfInterest } from '../models/PointOfInterest';
import { useEffect } from 'react';
import { MapLayer } from '../models/MapLayer';
import MapFab from '../components/Map/MapFab';

const MapScreen: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>();
  const [layer, setLayer] = useState<MapLayer>('normal');
  const [markers, setMarkers] = useState<Map<PointOfInterest, MapMarker>>();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const mapRegion: Region = {
    latitude: 51.200977,
    longitude: 4.850671,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  useEffect(() => {
    setSelectedMarker(null);
    const newMarkers: Map<PointOfInterest, MapMarker> = new Map();
    getMapMarkers().forEach((value: MapMarker, key: PointOfInterest) => {
      if (value.layer === layer) {
        newMarkers.set(key, value);
      }
    });

    setMarkers(newMarkers);
  }, [layer]);

  useEffect(() => {
    sheetRef.current?.snapTo(0);
  }, [selectedMarker]);

  const onMapReady = async () => {
    await Location.requestForegroundPermissionsAsync();
  };

  const handleMarkerSelect = (markerIdentifier: PointOfInterest) => {
    const markerObject = markers?.get(markerIdentifier);
    setSelectedMarker(markerObject);
  };

  const handleMapPress = () => {
    setSelectedMarker(null);
    sheetRef.current?.close();
  };

  const handleLayerSelect = (newLayer: MapLayer): void => {
    if (layer !== newLayer) {
      sheetRef.current?.close();
      setLayer(newLayer);
    }
  };

  const renderMarkers = () => {
    const nodes: JSX.Element[] = [];
    markers?.forEach((value: MapMarker, key: PointOfInterest) =>
      nodes.push(
        <Marker
          onPress={(e) => {
            e.stopPropagation();
            handleMarkerSelect(e.nativeEvent.id as PointOfInterest);
          }}
          key={key}
          coordinate={value.latLng}
          identifier={key}
        />,
      ),
    );
    return nodes;
  };

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
        {renderMarkers()}
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
      <MapFab handleLayerSelect={handleLayerSelect} />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default MapScreen;
