import React from 'react';

import {
	createMaterialTopTabNavigator,
	MaterialTopTabNavigationEventMap,
	MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { Link, withLayoutContext } from 'expo-router';
import { Platform, Pressable } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
	MaterialTopTabNavigationOptions,
	typeof Navigator,
	TabNavigationState<ParamListBase>,
	MaterialTopTabNavigationEventMap
>(Navigator);
