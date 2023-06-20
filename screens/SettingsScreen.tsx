import React from 'react';
import { Text, View } from '../components/Themed/Themed';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const SettingsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const versionColor = Colors[colorScheme].muted;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>Placeholder</Text>
      </View>
      <Text style={[styles.version, { color: versionColor }]}>
        v{Constants.manifest?.version}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop: 8,
    marginHorizontal: 8,
  },
  version: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default SettingsScreen;
