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
import ContentCard from '../components/ContentCard';
import CountdownTimer from '../components/CountDownTimer';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';

const HomeScreen: React.FC = () => {
  return (
    <StickyParallaxHeader
      headerType="AvatarHeader"
      title="Hello"
      backgroundColor={Colors.schemeIndependent.fosBlue}
    />
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
    flex: 1,
  },
  eventSeparator: {
    borderBottomWidth: 2,
    marginTop: 5,
    marginBottom: 5,
  },
});
