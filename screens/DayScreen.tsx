import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getMapMarkers } from '../services/DataService';
import { ScheduleData } from '../models/ScheduleData';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { HeaderText, View, Text } from '../components/Themed';
import Accordion from 'react-native-collapsible/Accordion';
import CollapsibleChevron from '../components/CollapsibleChevron/CollapsibleChevron';
import { useContent } from '../hooks/useContent';
import { PROGRAM_ITEMS } from '../constants/Strings';
import { OpeningHours } from '../components/Schedule/OpeningHours';

export interface DayInfo {
  day: 'Vrijdag' | 'Zaterdag' | 'Zondag';
}

const DayScreen: React.FC<DayInfo> = (dayInfo: DayInfo) => {
  const [activeSections, setActiveSections] = useState<number[] | string[]>([]);
  const [dayEvents, setDayEvents] = useState<ScheduleData[]>();
  const [dayGeneralHours, setDayGeneralHours] = useState<ScheduleData>();
  const [content, lastUpdated] = useContent<ScheduleData>(
    `${PROGRAM_ITEMS}/${dayInfo.day}`,
  );
  const colorScheme = useColorScheme();
  const mapMarkers = getMapMarkers('normal');

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

  const renderHeader = (
    content: ScheduleData,
    _: unknown,
    isActive: boolean,
  ) => {
    return (
      <Animatable.View duration={400} transition="backgroundColor">
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <HeaderText style={styles.eventH3}>
                {content.time}
                {content.location
                  ? ` - ${mapMarkers.get(content.location)?.title}`
                  : null}
              </HeaderText>
            </View>
            <View>
              <CollapsibleChevron isActive={isActive} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <HeaderText style={styles.eventH1}>{content.name}</HeaderText>
          </View>
        </View>
      </Animatable.View>
    );
  };

  const renderContent = (content: ScheduleData) => {
    return (
      <Animatable.View
        duration={400}
        style={styles.content}
        transition="backgroundColor"
      >
        <Text>{content.description}</Text>
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
              renderHeader={renderHeader}
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
