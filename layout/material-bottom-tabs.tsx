import {
<<<<<<< HEAD
	createMaterialBottomTabNavigator,
	MaterialBottomTabNavigationOptions,
	MaterialBottomTabNavigationEventMap
=======
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
  MaterialBottomTabNavigationEventMap,
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
} from '@react-navigation/material-bottom-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

import { withLayoutContext } from 'expo-router';

const { Navigator } = createMaterialBottomTabNavigator();

export const MaterialBottomTabs = withLayoutContext<
<<<<<<< HEAD
	MaterialBottomTabNavigationOptions,
	typeof Navigator,
	TabNavigationState<ParamListBase>,
	MaterialBottomTabNavigationEventMap
=======
  MaterialBottomTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialBottomTabNavigationEventMap
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
>(Navigator);
