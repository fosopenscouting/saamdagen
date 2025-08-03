import React from 'react';

import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  CommonActions,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';

import { withLayoutContext } from 'expo-router';
import { BottomNavigation, configureFonts } from 'react-native-paper';
import Colors from '@/constants/Colors';

const { Navigator } = createBottomTabNavigator();

export const MaterialBottomTabs = withLayoutContext<
  BottomTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  BottomTabNavigationEventMap
>(Navigator);

export const MaterialBottomTabsNavigator = ({
  navigation,
  state,
  descriptors,
  insets,
}: BottomTabBarProps) => {
  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) preventDefault();
        else
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
      }}
      renderIcon={({ route, focused, color }) =>
        descriptors[route.key].options.tabBarIcon?.({
          focused,
          color,
          size: 24,
        }) || null
      }
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];

        const label =
          typeof options.tabBarLabel == 'string'
            ? options.tabBarLabel
            : typeof options.title == 'string'
              ? options.title
              : route.name;

        return label;
      }}
      activeColor={Colors.FOSCOLORS.FOS_GREEN}
      inactiveColor={'#ccc'}
      activeIndicatorStyle={{
        backgroundColor: Colors.FOSCOLORS.FOS_BLUE_DARKENED,
      }}
      theme={{
        fonts: configureFonts({
          config: { fontFamily: 'Quicksand_600SemiBold' },
        }),
      }}
      // Fix bug in react-native-paper
      style={{
        backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
      }}
    />
  );
};
