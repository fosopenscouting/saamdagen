import React, { useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import CountdownTimer from '../components/CountDownTimer';
import BasicCard from '../components/BasicCard';
import { HomeScreenSection } from '../models/HomeScreenSection';
import { HOME_ITEMS } from '../constants/Strings';
import { useDataContext } from '../hooks/useDataContext';
import Colors from '../constants/Colors';
import ContentCard from '../components/ContentCard';
import { Text } from '../components/Themed/Text';
import { RefreshControl } from 'react-native-gesture-handler';

const HomeScreen: React.FC = () => {
  const { data, refreshContext, refreshing } = useDataContext();
  const handleRefresh = async () => {
    await refreshContext();
  };

  // Always try to refresh data on load. We can do it here because the screen is never unmounted in the bottom tab.
  useEffect(() => {
    const refreshAsync = async () => {
      await refreshContext();
    };
    refreshAsync();
  }, []);

  return (
    <>
      <ScrollView
        style={{ height: '100%' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <ImageBackground
          imageStyle={{ opacity: 0.6 }}
          source={require('../assets/images/home-banner.png')}
          style={styles.foregroundImage}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{
                marginTop: 26,
                height: '70%',
                resizeMode: 'contain',
              }}
              source={require('../assets/images/logo.png')}
            />
          </View>
        </ImageBackground>
        <CountdownTimer targetDate={new Date('2023-09-22T20:00:00+02:00')} />
        <ContentCard
          containerStyle={styles.saamregels}
          palette="fosBlue"
          backgroundImage={require('../assets/images/saamregels.png')}
        >
          <Text style={styles.countdownTitle}></Text>
        </ContentCard>
        {data
          ?.filter((x) => x.key === HOME_ITEMS)[0]
          .content?.map((item: HomeScreenSection) => (
            <BasicCard
              key={item.order}
              containerStyle={styles.basicCard}
              content={item.content}
              title={item.title}
              mode="elevated"
              palette="fosBlue"
            />
          ))}
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  basicCard: {
    marginHorizontal: 8,
    marginTop: 8,
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
    marginTop: 10,
  },
  foregroundImage: {
    width: '100%',
    height: 430,
    backgroundColor: Colors.schemeIndependent.fosBlue,
    marginBottom: 10,
  },
  saamregels: {
    marginHorizontal: 8,
    height: 200,
  },
  countdownTitle: {
    height: '100%',
  },
});
