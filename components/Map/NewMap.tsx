import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import React, { useState, useRef, createRef } from 'react';
import { Image, StyleSheet } from 'react-native';
import Grondplan from '../../assets/grondplan.png';
import GrondPlanGrootSpel from '../../assets/groot-spel-map.png';
import { MapLayer } from '../../models/MapLayer';
import { View, Text } from '../Themed';
import MapFab from './MapFab';

const NewMap = () => {

  const [layer, setLayer] = useState<MapLayer>('normal');

  const handleLayerSelect = (newLayer: MapLayer): void => {
    if (layer !== newLayer) {
      setLayer(newLayer);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexShrink: 1,
          height: '100%',
          width: '100%',
          backgroundColor: '#AEDBC4',
        }}
      >
        <ReactNativeZoomableView maxZoom={10}>
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={layer === 'normal' ? Grondplan : GrondPlanGrootSpel}
          />
        </ReactNativeZoomableView>
      </View>
      <MapFab handleLayerSelect={handleLayerSelect} />
    </View>
  );
};

export default NewMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#AEDBC4',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
