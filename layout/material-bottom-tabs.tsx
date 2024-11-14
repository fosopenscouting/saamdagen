import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
  MaterialBottomTabNavigationEventMap,
} from 'react-native-paper/react-navigation';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

import { withLayoutContext } from 'expo-router';

const { Navigator } = createMaterialBottomTabNavigator();

export const MaterialBottomTabs = withLayoutContext<
  MaterialBottomTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialBottomTabNavigationEventMap
>(Navigator);
