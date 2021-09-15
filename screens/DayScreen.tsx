import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getGeneralOpeningHours, getMapMarkers, getScheduleData } from '../services/DataService';
import { ScheduleData } from '../models/ScheduleData';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { HeaderText, View, Text } from '../components/Themed';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import CollapsibleChevron from '../components/CollapsibleChevron/CollapsibleChevron';

interface DayInfo {
  day: number;
}

const DayScreen: React.FC<DayInfo> = (dayInfo: DayInfo) => {
  const [activeSections, setActiveSections] = useState<number[] | string[]>([]);
  const [hideOverview, setHideOverview] = useState(false);
  const dayEvents: ScheduleData[] = getScheduleData().filter(
    (event) => event.startTime.getDate() == dayInfo.day,
  );
  const dayGeneralHours: ScheduleData[] = getGeneralOpeningHours().filter(
    (event) => event.startTime.getDate() == dayInfo.day,
  );
  const colorScheme = useColorScheme();
  const mapMarkers = getMapMarkers('normal');

  const renderScheduleTime = (
    scheduleData: ScheduleData,
    showUndefinedEndTime = false,
  ): string => {
    const startHours = `${scheduleData.startTime.getHours()}`.padStart(2, '0');
    const startMinutes = `${scheduleData.startTime.getMinutes()}`.padStart(
      2,
      '0',
    );
    const startTime = `${startHours}u${startMinutes}`;
    if (scheduleData.endTime) {
      const endHours = `${scheduleData.endTime.getHours()}`.padStart(2, '0');
      const endMinutes = `${scheduleData.endTime.getMinutes()}`.padStart(
        2,
        '0',
      );
      return `${startTime} tot ${endHours}u${endMinutes}`;
    } else if (showUndefinedEndTime) {
      return `${startTime} tot ...`;
    } else {
      return startTime;
    }
  };

  const renderHeader = (content: ScheduleData, _: any, isActive: boolean) => {
    return (
      <Animatable.View duration={400} transition="backgroundColor">
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <HeaderText style={styles.eventH3}>
                {renderScheduleTime(content)}
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

  const renderContent = (content: ScheduleData, _: any, isActive: boolean) => {
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

  const renderFooter = (content: ScheduleData, _: any, isActive: boolean) => {
    return (
      <View
        style={[
          styles.eventSeparator,
          { borderBottomColor: Colors[colorScheme].headerColor },
        ]}
      />
    );
  };

  const renderGeneralOpeningHours = () => {
    const elements: JSX.Element[] = [];
    dayGeneralHours.forEach((element) => {
      elements.push(
        <HeaderText style={styles.openingHours}>
          <HeaderText style={styles.eventH3}>{element.name}</HeaderText>{' '}
          {renderScheduleTime(element, true)}
        </HeaderText>,
      );
    });
    return elements;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ paddingTop: 8, margin: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => setHideOverview(!hideOverview)}>
                <HeaderText style={styles.eventH2}>
                  ALGEMENE OPENINGSUREN
                </HeaderText>
              </TouchableOpacity>
            </View>
            <View>
              <CollapsibleChevron isActive={!hideOverview} />
            </View>
          </View>
          <Collapsible collapsed={hideOverview}>
            <View style={styles.container}>{renderGeneralOpeningHours()}</View>
          </Collapsible>
          <View
            style={[
              styles.filterBar,
              { backgroundColor: Colors[colorScheme].tabBackground },
            ]}
          ></View>
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
    fontWeight: 'bold',
    flex: 1,
  },
  eventH2: {
    fontSize: 24,
    fontWeight: 'normal',
    fontFamily: 'AndesLight',
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  eventH1: {
    fontSize: 32,
    fontWeight: 'normal',
    fontFamily: 'AndesLight',
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
