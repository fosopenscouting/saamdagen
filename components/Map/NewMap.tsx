import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
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
<<<<<<< HEAD
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              source={getLayerImage(layer)}
            />
          </ReactNativeZoomableView>
        </View>
        <MapFab handleLayerSelect={handleLayerSelect} currentLayer={layer} />
=======
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
              source={layer === 'normal' ? Grondplan : GrondPlanGrootSpel}
            />
          </ReactNativeZoomableView>
        </View>
        <MapFab handleLayerSelect={handleLayerSelect} />
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
      </View>
    </Portal.Host>
  );
};

export default NewMap;

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
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
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
});
