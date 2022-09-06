import React, { useState, useRef, useMemo } from 'react';
import { View } from '../components/Themed';
import { StyleSheet } from 'react-native';
import { MapMarker } from '../models/MapMarker';
import BottomSheet from '@gorhom/bottom-sheet';
import MapDetail from '../components/Map/MapDetail';
import { useEffect } from 'react';
import { MapLayer } from '../models/MapLayer';
import MapFab from '../components/Map/MapFab';
import { useContent } from '../hooks/useContent';
import { MAP_ITEMS } from '../constants/Strings';
import Map from '../components/Map/Map';
import NewMap from '../components/Map/NewMap';

const MapScreen: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>();
  const [layer, setLayer] = useState<MapLayer>('normal');
  const [markers, setMarkers] = useState<MapMarker[]>();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [content] = useContent<MapMarker>(MAP_ITEMS);

  const handleLayerChange = (layer: MapLayer) => {
    setSelectedMarker(null);
    const markersForLayer = content?.filter((x) => x.layer === layer);
    setMarkers(markersForLayer);
  };

  useEffect(() => {
    handleLayerChange(layer);
  }, [content, layer]);

  useEffect(() => {
    sheetRef.current?.collapse();
  }, [selectedMarker]);

  const handleMarkerSelect = (markerIdentifier: string) => {
    const markerObject = markers?.find(
      (item) => item.title === markerIdentifier,
    );
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

  // return <NewMap />;

  return (
    <View style={styles.container}>
      <Map
        markers={markers}
        onMapsPress={handleMapPress}
        onMarkerSelect={handleMarkerSelect}
      />
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

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default MapScreen;
