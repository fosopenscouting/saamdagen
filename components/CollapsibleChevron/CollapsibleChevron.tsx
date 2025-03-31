import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  isActive: boolean;
}

const CollapsibleChevron: React.FC<Props> = (props: Props) => {
  const colorScheme = useColorScheme();
  const duration = 1000;
  const rotation = useSharedValue(0);
  const rotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));

  useEffect(() => {
    if (props.isActive) rotation.value = withSpring(90, { duration });
    else rotation.value = withSpring(0, { duration });
  }, [props.isActive]);

  return (
    <Animated.View
      style={[
        rotationStyle,
        {
          transform: [{ rotate: '90deg' }],
        },
      ]}
    >
      <MaterialCommunityIcons
        name="chevron-right"
        size={32}
        color={Colors[colorScheme].tabBarStyle.backgroundColor}
      />
    </Animated.View>
  );
};

export default CollapsibleChevron;
