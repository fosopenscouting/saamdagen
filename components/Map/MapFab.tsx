import React from 'react';
import { useState } from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
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
    <Provider>
      <Portal>
        <FAB.Group
          visible
          fabStyle={{ backgroundColor: Colors[colorScheme].tabBackground }}
          open={fabOpen}
          icon="layers"
          actions={[
             {
              icon: 'map-marker-outline',
              label: 'Spelnamiddag',
              onPress: () => props.handleLayerSelect('big_game'),
            },
             {
              icon: 'map-marker-outline',
              label: 'Vormingen',
              onPress: () => props.handleLayerSelect('activities'),
            },
            {
              icon: 'map-marker-outline',
              label: 'Vrijdagavond',
              onPress: () => props.handleLayerSelect('friday'),
            },
            {
              icon: 'map-marker-outline',
              label: 'Plattegrond',
              onPress: () => props.handleLayerSelect('normal'),
            },
          ]}
          onStateChange={() => setFabOpen(!fabOpen)}
        />
      </Portal>
    </Provider>
  );
};

export default MapFab;
