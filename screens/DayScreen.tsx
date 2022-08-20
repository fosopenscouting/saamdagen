import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ScheduleData } from '../models/ScheduleData';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { View, Markdown, Text } from '../components/Themed';
import Accordion from 'react-native-collapsible/Accordion';
import { useContent } from '../hooks/useContent';
import { PROGRAM_ITEMS } from '../constants/Strings';
import { OpeningHours } from '../components/Schedule/OpeningHours';
import { ActivityHeader } from '../components/Schedule/ActivityHeader';

export interface DayInfo {
  day: 'Vrijdag' | 'Zaterdag' | 'Zondag';
}

const renderActivityHeader = (
  content: ScheduleData,
  _: unknown,
  isActive: boolean,
) => {
  return (
    <ActivityHeader content={content} isActive={isActive}></ActivityHeader>
  );
};

const DayScreen: React.FC<DayInfo> = (dayInfo: DayInfo) => {
  const [activeSections, setActiveSections] = useState<number[] | string[]>([]);
  const [dayEvents, setDayEvents] = useState<ScheduleData[]>();
  const [dayGeneralHours, setDayGeneralHours] = useState<ScheduleData>();
  const [content, lastUpdated] = useContent<ScheduleData>(
    `${PROGRAM_ITEMS}/${dayInfo.day}`,
  );
  const colorScheme = useColorScheme();

  useEffect(() => {
    const events = content?.filter((x) => x.type !== 'algemene_openingsuren');
    const openingHours = content?.filter(
      (x) => x.type === 'algemene_openingsuren',
    );
    setDayEvents(events);
    if (openingHours) {
      setDayGeneralHours(openingHours[0]);
    }
  }, [content]);

  const renderContent = (content: ScheduleData) => {
    return (
      <Animatable.View
        duration={400}
        style={styles.content}
        transition="backgroundColor"
      >
        <Text style={{fontStyle: 'italic'}}>test</Text>
        <Markdown>{content.description}</Markdown>
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
        <View style={{ paddingTop: 8, margin: 10 }}>
          <OpeningHours openingHours={dayGeneralHours} />
          <View
            style={[
              styles.filterBar,
              { backgroundColor: Colors[colorScheme].tabBackground },
            ]}
          ></View>
          {dayEvents ? (
            <Accordion
              sections={dayEvents}
              renderHeader={renderActivityHeader}
              // renderSectionTitle={renderHeader}
              renderContent={renderContent}
              renderFooter={renderFooter}
              activeSections={activeSections}
              onChange={setActiveSections}
              underlayColor={Colors[colorScheme].background}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default DayScreen;

const styles = StyleSheet.create({
  content: {
    marginBottom: 5,
  },
  openingHours: {
    lineHeight: 22,
  },
  container: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  collapsibleIndicator: {
    flex: 1,
    textAlign: 'right',
    fontSize: 32,
  },
  eventH3: {
    fontSize: 16,
    flex: 1,
  },
  eventH2: {
    fontSize: 24,
    fontWeight: 'normal',
    fontFamily: 'Quicksand_300Light',
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  eventH1: {
    fontSize: 32,
    fontWeight: 'normal',
    fontFamily: 'Quicksand_300Light',
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  eventSeparator: {
    borderBottomWidth: 2,
    marginTop: 5,
    marginBottom: 5,
  },
  filterBar: {
    // height: 100,
    height: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});
