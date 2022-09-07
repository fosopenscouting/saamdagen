import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import CountdownTimer from '../components/CountDownTimer';
import ParallaxHeader from '../components/ParallaxHeader';
import BasicCard from '../components/BasicCard';
import { HomeScreenSection } from '../models/HomeScreenSection';
import { useContent } from '../hooks/useContent';
import { HOME_ITEMS } from '../constants/Strings';

const HomeScreen: React.FC = () => {
  const [content] = useContent<HomeScreenSection>(HOME_ITEMS);
  const [data, setData] = useState<HomeScreenSection[] | undefined>();

  useEffect(() => {
    setData(content);
  }, [content]);

  return (
    <>
      <ParallaxHeader>
        <View style={{ height: '100%' }}>
          <CountdownTimer targetDate={new Date('2022-09-23T19:00:00+02:00')} />
          {data?.map((item) => (
            <BasicCard
              key={item.order}
              containerStyle={styles.basicCard}
              content={item.content}
              title={item.title}
              mode="elevated"
              palette="fosBlue"
            />
          ))}
        </View>
      </ParallaxHeader>
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
});
