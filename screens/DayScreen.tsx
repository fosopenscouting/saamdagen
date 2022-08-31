import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ScheduleData } from '../models/ScheduleData';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { View } from '../components/Themed';
import Accordion from 'react-native-collapsible/Accordion';
import { useContent } from '../hooks/useContent';
import { PROGRAM_ITEMS } from '../constants/Strings';
import { OpeningHours } from '../components/Schedule/OpeningHours';
import { ActivityHeader } from '../components/Schedule/ActivityHeader';
import { ActivityFooter } from '../components/Schedule/ActivityFooter';
import { ActivityContent } from '../components/Schedule/ActivityContent';

export interface DayInfo {
  day: 'Vrijdag' | 'Zaterdag' | 'Zondag';
}

const DayScreen: React.FC<DayInfo> = (dayInfo: DayInfo) => {
  const [activeSections, setActiveSections] = useState<number[] | string[]>([]);
  const [dayEvents, setDayEvents] = useState<ScheduleData[]>();
  const [dayGeneralHours, setDayGeneralHours] = useState<ScheduleData>();
  const [content] = useContent<ScheduleData>(`${PROGRAM_ITEMS}/${dayInfo.day}`);
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
              renderHeader={(content, _index, isActive) => (
                <ActivityHeader content={content} isActive={isActive} />
              )}
              renderContent={ActivityContent}
              renderFooter={() => <ActivityFooter />}
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

  filterBar: {
    // height: 100,
    height: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});
