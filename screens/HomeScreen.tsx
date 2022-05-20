import React from 'react';
import { StyleSheet, Image, Animated } from 'react-native';
import { View, Text } from '../components/Themed';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import Colors from '../constants/Colors';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import CountdownTimer from '../components/CountDownTimer';
import { StatusBar } from 'expo-status-bar';
import AppStoreHeader from '../components/AppStoreHeader';
import ContentCard from '../components/ContentCard';
import ContentCardTitle from '../components/ContentCardTitle';
import BasicCard from '../components/BasicCard';

const loremIpsum = `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
Eveniet unde, eaque asperiores aliquid iste molestias corporis reiciendis
rem ipsa aspernatur nulla excepturi non?
Reiciendis soluta sunt maxime accusantium voluptatibus odio.`;

const HomeScreen: React.FC = () => {
  return (
    <>
      <AppStoreHeader>
        <View style={{ height: '100%' }}>
          <ContentCard
            containerStyle={[styles.countdown, { marginTop: 8 }]}
            colorOverlay
            palette="fosBlue"
            backgroundImage={require('../assets/images/banner.jpg')}
          >
            <Text style={styles.countdownTitle}>SAAMDAGEEEN</Text>
            <CountdownTimer targetDate={new Date(2022, 9, 23)} />
          </ContentCard>
          <BasicCard
            containerStyle={styles.countdown}
            content={loremIpsum}
            title="Scan je ticket"
            mode="elevated"
            palette="fosBlue"
          />

          <BasicCard
            containerStyle={styles.countdown}
            mode="outlined"
            palette="brightPink"
            title="Volg je Saamdagen al op Facebook?"
            content={loremIpsum}
          />

          <BasicCard
            containerStyle={styles.countdown}
            mode="elevated"
            palette="seaGreen"
            title="Praktische info"
            content={loremIpsum}
          />

          <BasicCard
            containerStyle={styles.countdown}
            mode="outlined"
            palette="brightYellow"
            title="Programma"
            content={loremIpsum}
          />
        </View>
      </AppStoreHeader>
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
