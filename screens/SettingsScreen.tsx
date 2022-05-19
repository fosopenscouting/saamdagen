import React from 'react';
import { Text, View } from '../components/Themed';
import { StyleSheet, Text as NormalText } from 'react-native';
import Constants from 'expo-constants';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ContentCard from '../components/ContentCard';
import CountdownTimer from '../components/CountDownTimer';
const SettingsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const versionColor = Colors[colorScheme].muted;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ContentCard
          backgroundImage={require('../assets/images/banner.jpg')}
          palette="warmRed"
          title="Over deze app"
        >
          <Text
            style={{
              fontFamily: 'Quicksand_600SemiBold',
              fontSize: 25,
              textAlign: 'center',
              color: 'white',
            }}
          >
            SAAMDAGEEEN
          </Text>
          <CountdownTimer targetDate={new Date(2022, 9, 23, 19, 0)} />
        </ContentCard>
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
