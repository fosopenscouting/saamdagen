import React from 'react';

import {
  MaterialBottomTabs,
  MaterialBottomTabsNavigator,
} from '@/layout/material-bottom-tabs';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <MaterialBottomTabs
        screenOptions={{
          tabBarActiveBackgroundColor: Colors[colorScheme].tint,
          tabBarInactiveBackgroundColor: Colors[colorScheme].tabIconDefault,
          tabBarStyle: Colors[colorScheme].tabBarStyle,
          animation: 'shift',
          headerShown: false,
        }}
        tabBar={MaterialBottomTabsNavigator}
      >
        <MaterialBottomTabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialDesignIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="schedule"
          options={{
            tabBarLabel: 'Programma',
            tabBarIcon: ({ color }) => (
              <MaterialDesignIcons
                name="timeline-text"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="map"
          options={{
            tabBarLabel: 'Plattegrond',
            tabBarIcon: ({ color }) => (
              <MaterialDesignIcons name="map" color={color} size={26} />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="faq"
          options={{
            tabBarLabel: 'Info',
            tabBarIcon: ({ color }) => (
              <MaterialDesignIcons
                name="frequently-asked-questions"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="more"
          options={{
            tabBarLabel: 'Meer',
            tabBarIcon: ({ color }) => (
              <MaterialDesignIcons
                name="dots-horizontal"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </MaterialBottomTabs>
      <StatusBar animated={true} style="light" />
    </>
  );
}
