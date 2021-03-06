/* eslint-disable react/no-children-prop */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

const Tab = createMaterialTopTabNavigator();

interface Props {
  tabNumber: number;
}

const TabScreen: React.FC<Props> = (props: Props): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text>Hello Tab {props.tabNumber}</Text>
    </View>
  );
};

const ScheduleScreen: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Vrijdag"
        children={() => <TabScreen tabNumber={0} />}
      ></Tab.Screen>
      <Tab.Screen
        name="Zaterdag"
        children={() => <TabScreen tabNumber={1} />}
      />
      <Tab.Screen name="Zondag" children={() => <TabScreen tabNumber={2} />} />
    </Tab.Navigator>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
