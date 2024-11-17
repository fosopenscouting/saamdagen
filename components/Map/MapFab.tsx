import React from 'react';
import { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { MapLayer } from '@/models/MapLayer';

interface MapFabProps {
  handleLayerSelect: (layer: MapLayer) => void;
  currentLayer: MapLayer;
}

const MapFab: React.FC<MapFabProps> = (props: MapFabProps) => {
  const colorScheme = useColorScheme();
  const [fabOpen, setFabOpen] = useState(false);

  const getColors = (layer: MapLayer) => {
    return {
      icon: Colors.FOSCOLORS.CORAL,
      bg:
        layer == props.currentLayer
          ? Colors.FOSCOLORS.FOS_GREEN
          : Colors.FOSCOLORS.SEA_GREEN,
    };
  };

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
            icon: 'forest',
            label: 'Spelnamiddag',
            onPress: () => props.handleLayerSelect('big_game'),
            color: getColors('big_game').icon,
            style: {
              backgroundColor: getColors('big_game').bg,
            },
          },
          {
            icon: 'school-outline',
            label: 'Vormingen',
            onPress: () => props.handleLayerSelect('activities'),
            color: getColors('activities').icon,
            style: {
              backgroundColor: getColors('activities').bg,
            },
          },
          {
            icon: 'weather-night',
            label: 'Vrijdagavond',
            onPress: () => props.handleLayerSelect('friday'),
            color: getColors('friday').icon,
            style: {
              backgroundColor: getColors('friday').bg,
            },
          },
          {
            icon: 'map-outline',
            label: 'Plattegrond',
            onPress: () => props.handleLayerSelect('normal'),
            color: getColors('normal').icon,
            style: {
              backgroundColor: getColors('normal').bg,
            },
          },
        ]}
        onStateChange={() => setFabOpen(!fabOpen)}
      />
    </Portal>
  );
};

export default MapFab;
