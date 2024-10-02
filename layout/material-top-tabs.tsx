import {
<<<<<<< HEAD
	createMaterialTopTabNavigator,
	MaterialTopTabNavigationEventMap,
	MaterialTopTabNavigationOptions,
=======
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
<<<<<<< HEAD
	MaterialTopTabNavigationOptions,
	typeof Navigator,
	TabNavigationState<ParamListBase>,
	MaterialTopTabNavigationEventMap
=======
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
>(Navigator);
