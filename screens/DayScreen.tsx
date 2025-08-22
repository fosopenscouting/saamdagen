import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View as NativeView,
} from 'react-native';
import { ScheduleData } from '@/models/ScheduleData';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { View } from '@/components/Themed/Themed';
import { PROGRAM_ITEMS } from '@/constants/Strings';
import { OpeningHours } from '@/components/Schedule/OpeningHours';
import { useDataContext } from '@/hooks/useDataContext';
import Timeline from 'react-native-timeline-flatlist';
import { useFocusEffect } from 'expo-router';
import { isLater, isNow, parseTime } from '@/utils/dates';
import { FAB } from 'react-native-paper';
import Constants from 'expo-constants';
import SingleActivity from '@/components/Schedule/SingleActivity';
import MultipleActivities from '@/components/Schedule/MultipleActivities';

export interface DayInfo {
  day: 'Vrijdag' | 'Zaterdag' | 'Zondag';
}

export interface GroupedEventsList {
  [key: string]: GroupedEvents;
}
export interface GroupedEvents {
  time: string;
  events: ScheduleData[];
  globalTimes: { start: string; end: string };
}

const DayScreen: React.FC<DayInfo> = (dayInfo: DayInfo) => {
  const [dayEventsGrouped, setDayEventsGrouped] = useState<GroupedEventsList>();
  const [dayGeneralHours, setDayGeneralHours] = useState<ScheduleData>();

  const currentTimelineItemRef = useRef<NativeView | undefined>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentTimelineItemPosition, setCurrentTimelineItemPosition] =
    useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const colorScheme = useColorScheme();

  const { data, refreshContext, refreshing } = useDataContext();
  const onRefresh = async () => {
    await refreshContext();
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
    const events: ScheduleData[] = content?.filter(
      //@ts-expect-error Cant give fixed type for content
      (x) => x.type !== 'algemene_openingsuren',
    );
    const openingHours = content?.filter(
      //@ts-expect-error Cant give fixed type for content
      (x) => x.type === 'algemene_openingsuren',
    );

    const grouped: GroupedEventsList = {};
    events.forEach((evt) => {
      if (typeof evt.time == 'string') {
        grouped[evt.time] = {
          time: parseTime(evt.time).start ?? evt.time,
          globalTimes: {
            start: evt.time,
            end: '00:00',
          },
          events: [evt],
        };
      } else {
        if (grouped[evt.time.start]) {
          grouped[evt.time.start].events.push(evt);

          if (
            evt.time.eind &&
            isLater(evt.time.eind, grouped[evt.time.start].globalTimes.end)
          )
            grouped[evt.time.start].globalTimes.end = evt.time.eind;
        } else {
          grouped[evt.time.start] = {
            time: evt.time.start,
            globalTimes: {
              start: evt.time.start,
              end: evt.time.eind ?? '00:00',
            },
            events: [evt],
          };
        }
      }
    });

    setDayEventsGrouped(grouped);

    if (openingHours) {
      setDayGeneralHours(openingHours[0]);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ margin: 10 }}>
          <OpeningHours openingHours={dayGeneralHours} />
          <View
            style={[styles.filterBar, Colors[colorScheme].tabBarStyle]}
          ></View>
          {dayEventsGrouped ? (
            <Timeline
              key="test"
              data={Object.values(dayEventsGrouped)
                .sort((a, b) => {
                  return (
                    parseInt(a.time.split(':')[0]) -
                    parseInt(b.time.split(':')[0])
                  );
                })
                .map((evts, index) => {
                  const active = isNow(
                    {
                      start: evts.globalTimes.start,
                      eind: evts.globalTimes.end,
                    },
                    dayInfo.day,
                  );
                  if (active) console.log('HIT');

                  const ref =
                    active && !currentTimelineItemRef.current
                      ? {
                          ref: currentTimelineItemRef,
                        }
                      : {};

                  if (evts.events?.length == 1) {
                    return {
                      time: evts.time,
                      title: evts.events[0].name,
                      description: [
                        <SingleActivity
                          key={`tl_${index}_singleactivity`}
                          evts={evts}
                          passedRef={ref}
                          index={index}
                        />,
                      ],
                      circleColor: active
                        ? Colors.FOSCOLORS.BRIGHTPINK
                        : Colors.FOSCOLORS.FOS_BLUE,
                      lineColor: active
                        ? Colors.FOSCOLORS.BRIGHTPINK
                        : Colors.FOSCOLORS.FOS_BLUE,
                    };
                  }

                  const description = evts.events.map((evt, i) => {
                    return (
                      <MultipleActivities
                        key={`tl_${index}_multipleactivities_${i}`}
                        i={i}
                        index={i}
                        evt={evt}
                        passedRef={ref}
                      />
                    );
                  });

                  return {
                    time: evts.time,
                    title: 'Volgende activiteiten:',
                    description: description,
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
              eventDetailStyle={{
                paddingTop: 0,
                paddingBottom: 20,
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
              style={{
                paddingTop: 5,
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
    height: 'auto',
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
    height: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});
