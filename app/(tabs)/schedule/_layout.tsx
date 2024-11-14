import React from 'react';

import { MaterialTopTabs } from '@/layout/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';
// import { returnDay } from '@/utils/dates';
import { useThemeColor } from '@/components/Themed/Helpers';

// const todayIsDay = returnDay(true);

export default function SheduleLayout() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  useFocusEffect(() => {
    setStatusBarBackgroundColor(
      Colors[colorScheme].tabBarStyle.backgroundColor,
      true,
    );
  });

  return (
    <>
      <MaterialTopTabs
        style={{
          paddingTop: insets.top,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
        }}
        screenOptions={{
          tabBarStyle: Colors[colorScheme].tabBarStyle,
          tabBarIndicatorStyle: {
            backgroundColor: Colors.FOSCOLORS.FOS_GREEN,
          },
          tabBarLabelStyle: {
            color: Colors[colorScheme].white,
            fontFamily: 'Quicksand_600SemiBold',
            fontWeight: 600,
          },
          sceneStyle: {
            backgroundColor: useThemeColor({}, 'background')
          }
        }}
      >
        <MaterialTopTabs.Screen
          name="friday"
          options={{
            title: 'Vrijdag',
          }}
          initialParams={{ day: 'Vrijdag' }}
        />
        <MaterialTopTabs.Screen
          name="saturday"
          options={{
            title: 'Zaterdag',
          }}
          initialParams={{ day: 'Zaterdag' }}
        />
        <MaterialTopTabs.Screen
          name="sunday"
          options={{
            title: 'Zondag',
          }}
          initialParams={{ day: 'Zondag' }}
        />
      </MaterialTopTabs>
    </>
  );
}
