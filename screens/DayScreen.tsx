import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View as NativeView,
} from 'react-native';
import { ScheduleData } from '@/models/ScheduleData';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { HeaderText, View } from '@/components/Themed/Themed';
import { PROGRAM_ITEMS } from '@/constants/Strings';
import { OpeningHours } from '@/components/Schedule/OpeningHours';
import { useDataContext } from '@/hooks/useDataContext';
import Timeline from 'react-native-timeline-flatlist';
import { Text } from '@/components/Themed/Text';
import { useFocusEffect } from 'expo-router';
import { checkDay } from '@/utils/dates';
import { FAB } from 'react-native-paper';
import Constants from 'expo-constants';

export interface DayInfo {
  day: 'Vrijdag' | 'Zaterdag' | 'Zondag';
}

const DayScreen: React.FC<DayInfo> = (dayInfo: DayInfo) => {
  const [dayEvents, setDayEvents] = useState<ScheduleData[]>();
  const [dayGeneralHours, setDayGeneralHours] = useState<ScheduleData>();

  const currentTimelineItemRef = useRef<NativeView | undefined>();
  const scrollViewRef = useRef<ScrollView>();
  const [currentTimelineItemPosition, setCurrentTimelineItemPosition] =
    useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const colorScheme = useColorScheme();

  const { data, refreshContext, refreshing } = useDataContext();
  const onRefresh = async () => {
    await refreshContext();
  };

  const todayIsDay = checkDay(dayInfo.day);
  const now = new Date();

  const isNow = (timeString: String) => {
    if (!todayIsDay) return false;

    if (timeString.includes('t.e.m.') && !timeString.includes('...')) {
      const split = timeString.split('t.e.m. ');
      const startTime = split[0].split(':');
      const endTime = split[1].split(':');
      //Create dummy dates
      const start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(startTime[0]),
        parseInt(startTime[1]),
        0,
      );
      const end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(endTime[0]),
        parseInt(endTime[1]),
        0,
      );

      return now >= start && now <= end;
    } else {
      return (
        parseInt(timeString.split(':')[0]) == now.getHours() &&
        parseInt(timeString.split(':')[1]) == now.getMinutes()
      );
    }
  };

  const scrollToItem = (
    x: number,
    y: number,
    width: number,
    height: number,
    pageX: number,
    pageY: number,
  ) => {
    if (isScrolling) return;

    const statusBarHeight = Constants.statusBarHeight;
    const tobTabsHeight = 50;

    const scrollToHeight = pageY - statusBarHeight - tobTabsHeight - 35;

    if (currentTimelineItemPosition == 0) {
      setCurrentTimelineItemPosition(scrollToHeight);
    }
  };

  const scrollToCurrent = () => {
    if (currentTimelineItemPosition !== 0 && !isScrolling) {
      setIsScrolling(true);

      scrollViewRef.current?.scrollTo({
        x: 0,
        y: currentTimelineItemPosition,
        animated: true,
      });

      setIsScrolling(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (currentTimelineItemRef.current && !isScrolling) {
        setIsScrolling(true);

        currentTimelineItemRef.current?.measure(scrollToItem);

        setIsScrolling(false);
      }
    }, [currentTimelineItemRef.current]),
  );

  useEffect(() => {
    const content = data?.filter(
      (x) => x.key === `${PROGRAM_ITEMS}/${dayInfo.day}`,
    )[0].content;
    const events = content?.filter((x) => x.type !== 'algemene_openingsuren');
    const openingHours = content?.filter(
      (x) => x.type === 'algemene_openingsuren',
    );
    setDayEvents(events);
    if (openingHours) {
      setDayGeneralHours(openingHours[0]);
    }
  }, [data]);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingTop: 8, margin: 10 }}>
          <OpeningHours openingHours={dayGeneralHours} />
          <View
            style={[styles.filterBar, Colors[colorScheme].tabBarStyle]}
          ></View>
          {dayEvents ? (
            <Timeline
              key="test"
              data={dayEvents.map((evt, index) => {
                const active = isNow(evt.time);

                const ref =
                  active && !currentTimelineItemRef.current
                    ? {
                        ref: currentTimelineItemRef,
                      }
                    : {};

                return {
                  time: evt.time.split(' ')[0],
                  title: evt.name,
                  description: [
                    <NativeView
                      collapsable={false}
                      {...ref}
                      style={{
                        margin: 0,
                      }}
                      key={`timeline_${index}_rootview`}
                    >
                      <HeaderText
                        variant="bodyMedium"
                        key={`timeline_${index}_header`}
                      >
                        {evt.time}
                      </HeaderText>
                      <Text key={`timeline_${index}_description`}>
                        {evt.description}
                      </Text>
                    </NativeView>,
                  ],
                  circleColor: active
                    ? Colors.FOSCOLORS.BRIGHTPINK
                    : Colors.FOSCOLORS.FOS_BLUE,
                  lineColor: active
                    ? Colors.FOSCOLORS.BRIGHTPINK
                    : Colors.FOSCOLORS.FOS_BLUE,
                };
              })}
              descriptionStyle={{
                color: Colors[colorScheme].text,
              }}
              titleStyle={{
                color: Colors[colorScheme].text,
                fontFamily: 'Quicksand_600SemiBold',
              }}
              timeStyle={{
                textAlign: 'center',
                backgroundColor: Colors.FOSCOLORS.SEA_GREEN,
                color: 'white',
                padding: 5,
                borderRadius: 13,
                fontFamily: 'Quicksand_600SemiBold',
              }}
              timeContainerStyle={{
                minWidth: 52,
                marginTop: 0,
              }}
              lineColor={Colors.FOSCOLORS.FOS_BLUE}
              circleColor={Colors.FOSCOLORS.FOS_BLUE}
              circleSize={20}
              innerCircle={'dot'}
              options={{
                style: {
                  paddingTop: 5,
                },
              }}
              isUsingFlatlist={false}
            />
          ) : null}
        </View>
      </ScrollView>
      {currentTimelineItemPosition !== 0 ? (
        <FAB
          icon="timeline-clock"
          color="white"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: 16,
            backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
          }}
          onPress={() => {
            scrollToCurrent();
          }}
        />
      ) : null}
    </>
  );
};

export default DayScreen;

const styles = StyleSheet.create({
  openingHours: {
    lineHeight: 22,
  },
  container: {
    flex: 1,
    height: 'auto',
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
