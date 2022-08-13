import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';
import CountdownTimer from '../components/CountDownTimer';
import ParallaxHeader from '../components/ParallaxHeader';
import ContentCard from '../components/ContentCard';
import BasicCard from '../components/BasicCard';
import { HomeScreenSection } from '../models/HomeScreenSection';
import { useContent } from '../hooks/useContent';
import { HOME_ITEMS } from '../constants/Strings';

const HomeScreen: React.FC = () => {
  const [content, lastUpdated] = useContent<HomeScreenSection>(HOME_ITEMS);

  return (
    <>
      <ParallaxHeader>
        <View style={{ height: '100%' }}>
          <ContentCard
            containerStyle={[styles.countdown, { marginTop: 8 }]}
            colorOverlay
            palette="fosBlue"
            backgroundImage={require('../assets/images/banner.jpg')}
          >
            <Text style={styles.countdownTitle}>SAAMDAGEEEN</Text>
            <CountdownTimer
              targetDate={new Date('2022-09-23T19:00:00+02:00')}
            />
          </ContentCard>
          {content?.map((item) => (
            <BasicCard
              key={item.order}
              containerStyle={styles.countdown}
              content={item.content}
              title={item.title}
              mode="elevated"
              palette="fosBlue"
            />
          ))}
          <Text>Laatst geupdatet: {lastUpdated}</Text>
        </View>
      </ParallaxHeader>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  countdown: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  logo: {
    padding: 4,
    color: 'white',
    flex: 1,
    alignItems: 'center',
    margin: 16,
  },
  content: {
    marginBottom: 5,
    textAlign: 'justify',
  },
  container: {
    flex: 1,
  },
  regularTitle: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  countdownTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  eventH3: {
    fontSize: 16,
    flex: 1,
  },
  eventSeparator: {
    borderBottomWidth: 2,
    marginTop: 5,
    marginBottom: 5,
  },
});
