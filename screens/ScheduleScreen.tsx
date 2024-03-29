/* eslint-disable react/no-children-prop */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import DayScreen from './DayScreen';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
const Tab = createMaterialTopTabNavigator();

const ScheduleScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: 'Quicksand_600SemiBold',
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors[colorScheme].tabBackground,
        },
      }}
    >
      <Tab.Screen
        name="Vrijdag"
        children={() => <DayScreen day="Vrijdag" />}
      ></Tab.Screen>
      <Tab.Screen
        name="Zaterdag"
        children={() => <DayScreen day="Zaterdag" />}
      />
      <Tab.Screen name="Zondag" children={() => <DayScreen day="Zondag" />} />
    </Tab.Navigator>
  );
};

export default ScheduleScreen;
