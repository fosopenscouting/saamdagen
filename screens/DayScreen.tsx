import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getMapMarkers, getScheduleData } from '../services/DataService';
import { ScheduleData } from '../models/ScheduleData';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { HeaderText, View } from '../components/Themed';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  const colorScheme = useColorScheme();
  const mapMarkers = getMapMarkers('normal');

  const renderScheduleTime = (scheduleData: ScheduleData): string => {
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
                {renderScheduleTime(content)} -{' '}
                {mapMarkers.get(content.location)?.title}
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
        <HeaderText>{content.description}</HeaderText>
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

  return (
    <View>
      <ScrollView>
        <View style={{ paddingTop: 30, margin: 10 }}>
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
            <View style={styles.container}>
              {/* :TODO: make this dynamic? */}
              <HeaderText style={styles.openingHours}>
                <HeaderText style={styles.eventH3}>Infopunt:</HeaderText> 20u00
                tot 02u30{'\n'}
                <HeaderText style={styles.eventH3}>Hoofdbar:</HeaderText> 21u00
                tot 02u00{'\n'}
                <HeaderText style={styles.eventH3}>
                  Rustige bar:
                </HeaderText>{' '}
                23u00 tot 02u30{'\n'}
                <HeaderText style={styles.eventH3}>
                  Bar fuiftent:
                </HeaderText>{' '}
                22u30 tot 03u00{'\n'}
                <HeaderText style={styles.eventH3}>FOS-Shop:</HeaderText> 20u00
                tot 22u00
              </HeaderText>
            </View>
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
    alignItems: 'flex-start',
    justifyContent: 'center',
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
