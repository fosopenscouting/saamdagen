import React from 'react';
import { useState } from 'react';
import { FAB, Portal, PaperProvider } from 'react-native-paper';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { MapLayer } from '../../models/MapLayer';

interface MapFabProps {
  handleLayerSelect: (layer: MapLayer) => void;
}

const MapFab: React.FC<MapFabProps> = (props: MapFabProps) => {
  const colorScheme = useColorScheme();
  const [fabOpen, setFabOpen] = useState(false);

  return (
    <Portal>
      <FAB.Group
        open={fabOpen}
        visible
        fabStyle={Colors[colorScheme].tabBarStyle}
        color="white"
        // backdropColor='rgba(0, 0, 0, 0.95)'
        icon="layers"
        actions={[
          {
            icon: 'alpha-g-box',
            label: 'Workshops',
            onPress: () => props.handleLayerSelect('big_game'),
            color: Colors.FOSCOLORS.CORAL,
            style: {
              backgroundColor: Colors.FOSCOLORS.SEA_GREEN,
            },
          },
          {
            icon: 'map-marker-outline',
            label: 'Plattegrond',
            onPress: () => props.handleLayerSelect('normal'),
            color: Colors.FOSCOLORS.CORAL,
            style: {
              backgroundColor: Colors.FOSCOLORS.SEA_GREEN,
            },
          },
        ]}
        onStateChange={() => setFabOpen(!fabOpen)}
      />
    </Portal>
  );
};

export default MapFab;
