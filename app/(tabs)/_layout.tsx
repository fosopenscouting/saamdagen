import React from 'react';

import { MaterialBottomTabs, MaterialBottomTabsNavigator } from '@/layout/material-bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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
          headerShown: false
        }}
        tabBar={MaterialBottomTabsNavigator}
      >
        <MaterialBottomTabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="schedule"
          options={{
            tabBarLabel: 'Programma',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="calendar-view-day" color={color} size={26} />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="map"
          options={{
            tabBarLabel: 'Plattegrond',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="map" color={color} size={26} />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="faq"
          options={{
            tabBarLabel: 'Info',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
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
              <MaterialCommunityIcons
                name="dots-horizontal"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </MaterialBottomTabs>
      <StatusBar backgroundColor="transparent" animated={true} style="light" />
    </>
  );
}
