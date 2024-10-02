import React from 'react';
import { useState } from 'react';
<<<<<<< HEAD
import { FAB, Portal } from 'react-native-paper';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { MapLayer } from '@/models/MapLayer';
=======
import { FAB, Portal, PaperProvider } from 'react-native-paper';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { MapLayer } from '../../models/MapLayer';
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f

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
      bg: layer == props.currentLayer ? Colors.FOSCOLORS.FOS_GREEN : Colors.FOSCOLORS.SEA_GREEN
    }
  }

  return (
    <Portal>
      <FAB.Group
<<<<<<< HEAD
        visible
        fabStyle={Colors[colorScheme].tabBarStyle}
        open={fabOpen}
        icon="layers"
        color='white'
        actions={[
          {
            icon: 'forest',
            label: 'Spelnamiddag',
            color: getColors('big_game').icon,
            style: { backgroundColor: getColors('big_game').bg },
            onPress: () => props.handleLayerSelect('big_game'),
          },
          {
            icon: 'school',
            label: 'Vormingen',
            color: getColors('activities').icon,
            style: { backgroundColor: getColors('activities').bg },
            onPress: () => props.handleLayerSelect('activities'),
          },
          {
            icon: 'weather-night',
            label: 'Vrijdagavond',
            color: getColors('friday').icon,
            style: { backgroundColor: getColors('friday').bg },
            onPress: () => props.handleLayerSelect('friday'),
          },
          {
            icon: 'map-outline',
            label: 'Plattegrond',
            color: getColors('normal').icon,
            style: { backgroundColor: getColors('normal').bg },
            onPress: () => props.handleLayerSelect('normal'),
=======
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
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
          },
        ]}
        onStateChange={() => setFabOpen(!fabOpen)}
      />
    </Portal>
  );
};

export default MapFab;
