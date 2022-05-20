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

const data: number[] = [];
for (let i = 0; i < 100; i++) {
  data.push(i);
}

const HomeScreen: React.FC = () => {
  return (
    <>
      <AppStoreHeader>
        <View>
          <ContentCard
            title="Saamdagen"
            palette="warmRed"
            backgroundImage={require('../assets/images/banner.jpg')}
          >
            <CountdownTimer targetDate={new Date(2022, 9, 23)} />
          </ContentCard>
        </View>
      </AppStoreHeader>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
  title: {
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
