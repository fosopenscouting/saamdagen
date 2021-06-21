/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScanScreen from '../screens/ScanScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import { BottomTabParamList, InfoParamList, MapParamList, ProfileParamList, ScheduleParamList } from '../types';

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Info"
      activeColor={Colors[colorScheme].tint}
      inactiveColor={Colors[colorScheme].tabIconDefault}
      barStyle={{ backgroundColor: Colors[colorScheme].tabBackground }}
    >
      <BottomTab.Screen
        name="Info"
        component={InfoNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
        }}
      />
      <BottomTab.Screen
        name="Programma"
        component={ScheduleNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="calendar-view-day" color={color} size={26} />,
        }}
      />

      <BottomTab.Screen
        name="Grondplan"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="map" color={color} size={26} />,
        }}
      />


      <BottomTab.Screen
        name="Mijn Saamdagen"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const InfoStack = createStackNavigator<InfoParamList>();

const InfoNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <InfoStack.Navigator>
      <InfoStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Info', headerTintColor: Colors[colorScheme].tabTextColor, headerStyle: { backgroundColor: Colors[colorScheme].tabBackground } }}
      />
    </InfoStack.Navigator>
  );
}

const ScheduleStack = createStackNavigator<ScheduleParamList>();

const ScheduleNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{ headerTitle: 'Programma', headerTintColor: Colors[colorScheme].tabTextColor, headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: Colors[colorScheme].tabBackground } }}
      />
    </ScheduleStack.Navigator>
  );
}

const MapStack = createStackNavigator<MapParamList>();


const MapNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerTitle: 'Grondplan', headerTintColor: Colors[colorScheme].tabTextColor, headerStyle: { backgroundColor: Colors[colorScheme].tabBackground } }}
      />
    </MapStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();


const ProfileNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Mijn Saamdagen', headerTintColor: Colors[colorScheme].tabTextColor, headerStyle: { backgroundColor: Colors[colorScheme].tabBackground } }}
      />
      <ProfileStack.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{ headerTitle: 'Mijn Saamdagen', headerTintColor: Colors[colorScheme].tabTextColor, headerStyle: { backgroundColor: Colors[colorScheme].tabBackground } }}
      />
    </ ProfileStack.Navigator>
  );
}