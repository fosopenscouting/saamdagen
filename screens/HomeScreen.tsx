import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { HeaderText, View, Text } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Accordion from 'react-native-collapsible/Accordion';
import { getHomeScreenSections } from '../services/DataService';
import { HomeScreenSection } from '../models/HomeScreenSection';
import CollapsibleChevron from '../components/CollapsibleChevron/CollapsibleChevron';

const HomeScreen: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[] | string[]>([]);
  const colorScheme = useColorScheme();

  const renderHeader = (
    content: HomeScreenSection,
    _: unknown,
    isActive: boolean,
  ) => {
    return (
      <Animatable.View duration={400} transition="backgroundColor">
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <HeaderText style={styles.eventH3}>{content.title}</HeaderText>
            </View>
            <View>
              <CollapsibleChevron isActive={isActive} />
            </View>
          </View>
        </View>
      </Animatable.View>
    );
  };

  const renderContent = (content: HomeScreenSection) => {
    return (
      <Animatable.View
        duration={400}
        style={styles.content}
        transition="backgroundColor"
      >
        <Text>{content.content}</Text>
      </Animatable.View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={[
          styles.eventSeparator,
          { borderBottomColor: Colors[colorScheme].headerColor },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={{ width: '100%', height: 350 }}
          source={require('../assets/images/20210513_promo_saamdagen-661.jpg')}
        />
        <View style={{ paddingTop: 8, margin: 10 }}>
          <Accordion
            sections={getHomeScreenSections()}
            renderHeader={renderHeader}
            renderContent={renderContent}
            renderFooter={renderFooter}
            activeSections={activeSections}
            onChange={setActiveSections}
            underlayColor={Colors[colorScheme].background}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
    fontWeight: 'bold',
    flex: 1,
  },
  eventSeparator: {
    borderBottomWidth: 2,
    marginTop: 5,
    marginBottom: 5,
  },
});
