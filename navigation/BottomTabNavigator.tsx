/* eslint-disable react/prop-types */
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
import MoreScreen from '../screens/MoreScreen';
import FaqScreen from '../screens/FaqScreen';
import {
  BottomTabParamList,
  InfoParamList,
  MapParamList,
  MoreScreenParamList,
  ScheduleParamList,
  FaqParamList,
} from '../types';
import SettingsScreen from '../screens/SettingsScreen';
import SaamdagenAppbar from '../components/SaamdagenAppbar';
import VolunteerScreen from '../screens/VolunteerScreen';

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      shifting={false}
      initialRouteName="Home"
      activeColor={Colors[colorScheme].tint}
      inactiveColor={Colors[colorScheme].tabIconDefault}
      barStyle={{ backgroundColor: Colors[colorScheme].tabBackground }}
    >
      <BottomTab.Screen
        name="Home"
        component={InfoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Programma"
        component={ScheduleNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="calendar-view-day" color={color} size={26} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Plattegrond"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Info"
        component={FaqNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="frequently-asked-questions"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Meer"
        component={MoreScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="dots-horizontal"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

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
        options={{
          headerShown: false,
          headerMode: 'screen',
          headerTitle: 'Home',
          headerTintColor: Colors[colorScheme].tabTextColor,
          headerStyle: { backgroundColor: Colors[colorScheme].tabBackground },
          headerTitleStyle: {
            fontFamily: 'Quicksand_600SemiBold',
          },
        }}
      />
    </InfoStack.Navigator>
  );
};

const ScheduleStack = createStackNavigator<ScheduleParamList>();

const ScheduleNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <ScheduleStack.Navigator
      screenOptions={{
        header: (props) => <SaamdagenAppbar {...props} />,
      }}
    >
      <ScheduleStack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{
          headerTitle: 'Programma',
          headerTintColor: Colors[colorScheme].tabTextColor,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: Colors[colorScheme].tabBackground,
          },
          headerTitleStyle: {
            fontFamily: 'Quicksand_600SemiBold',
          },
        }}
      />
    </ScheduleStack.Navigator>
  );
};

const MapStack = createStackNavigator<MapParamList>();

const MapNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <MapStack.Navigator
      screenOptions={{
        header: (props) => <SaamdagenAppbar {...props} />,
      }}
    >
      <MapStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerTitle: 'Plattegrond',
          headerTintColor: Colors[colorScheme].tabTextColor,
          headerStyle: { backgroundColor: Colors[colorScheme].tabBackground },
          headerTitleStyle: {
            fontFamily: 'Quicksand_600SemiBold',
          },
        }}
      />
    </MapStack.Navigator>
  );
};

const FaqStack = createStackNavigator<FaqParamList>();

const FaqNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <FaqStack.Navigator
      screenOptions={{
        header: (props) => <SaamdagenAppbar {...props} />,
      }}
    >
      <FaqStack.Screen
        name="FaqScreen"
        component={FaqScreen}
        options={{
          headerTitle: 'Info',
          headerTintColor: Colors[colorScheme].tabTextColor,
          headerStyle: { backgroundColor: Colors[colorScheme].tabBackground },
          headerTitleStyle: {
            fontFamily: 'Quicksand_600SemiBold',
          },
        }}
      />
    </FaqStack.Navigator>
  );
};

const MoreStack = createStackNavigator<MoreScreenParamList>();

const MoreScreenNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <MoreStack.Navigator
      screenOptions={{
        header: (props) => <SaamdagenAppbar {...props} />,
      }}
    >
      <MoreStack.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{
          headerTitle: 'Meer',
          headerTintColor: Colors[colorScheme].tabTextColor,
          headerStyle: { backgroundColor: Colors[colorScheme].tabBackground },
          headerTitleStyle: {
            fontFamily: 'Quicksand_600SemiBold',
          },
        }}
      />

      <MoreStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerLeft: () => null,
          headerTitle: 'Mijn Saamdagen',
          headerTintColor: Colors[colorScheme].tabTextColor,
          headerStyle: { backgroundColor: Colors[colorScheme].tabBackground },
          headerTitleStyle: {
            fontFamily: 'Quicksand_600SemiBold',
          },
        }}
      />
      <MoreStack.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{
          headerTitle: 'Mijn Saamdagen',
          headerTintColor: Colors[colorScheme].tabTextColor,
          headerStyle: { backgroundColor: Colors[colorScheme].tabBackground },
          headerTitleStyle: {
            fontFamily: 'Quicksand_600SemiBold',
          },
        }}
      />
      <MoreStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerLeft: () => null,
          headerTitle: 'Instellingen',
          headerTintColor: Colors[colorScheme].tabTextColor,
          headerStyle: { backgroundColor: Colors[colorScheme].tabBackground },
          headerTitleStyle: {
            fontFamily: 'Quicksand_600SemiBold',
          },
        }}
      />
       <MoreStack.Screen
        name="VolunteerScreen"
        component={VolunteerScreen}
        options={{
          headerLeft: () => null,
          headerTitle: 'Helpende hand',
          headerTintColor: Colors[colorScheme].tabTextColor,
          headerStyle: { backgroundColor: Colors[colorScheme].tabBackground },
          headerTitleStyle: {
            fontFamily: 'Quicksand_600SemiBold',
          },
        }}
      />
    </MoreStack.Navigator>
  );
};
