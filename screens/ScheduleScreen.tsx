/* eslint-disable react/no-children-prop */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import DayScreen from './DayScreen';

const Tab = createMaterialTopTabNavigator();

const ScheduleScreen: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Vrijdag"
        children={() => <DayScreen day={24} />}
      ></Tab.Screen>
      <Tab.Screen name="Zaterdag" children={() => <DayScreen day={25} />} />
      <Tab.Screen name="Zondag" children={() => <DayScreen day={26} />} />
    </Tab.Navigator>
  );
};

export default ScheduleScreen;
