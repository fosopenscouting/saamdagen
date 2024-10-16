import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import getLayerImage, { MapLayer } from '@/models/MapLayer';
import { View } from '@/components/Themed/Themed';
import MapFab from './MapFab';
import { Portal } from 'react-native-paper';

const NewMap = () => {
  const [layer, setLayer] = useState<MapLayer>('normal');

  const handleLayerSelect = (newLayer: MapLayer): void => {
    if (layer !== newLayer) {
      setLayer(newLayer);
    }
  };
  return (
    <Portal.Host>
      <View style={styles.container}>
        <View
          style={{
            flexShrink: 1,
            height: '100%',
            width: '100%',
            backgroundColor: '#AEDBC4',
          }}
        >
          <ReactNativeZoomableView
            minZoom={1}
            maxZoom={5}
            doubleTapZoomToCenter={false}
          >
            <Image
              style={{ width: '100%', height: '100%' }}
              contentFit="contain"
              allowDownscaling={false}
              source={getLayerImage(layer)}
            />
          </ReactNativeZoomableView>
        </View>
        <MapFab handleLayerSelect={handleLayerSelect} currentLayer={layer} />
      </View>
    </Portal.Host>
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
    position: 'relative',
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
