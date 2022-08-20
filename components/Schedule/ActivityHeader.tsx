import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ScheduleData } from '../../models/ScheduleData';
import { getMapMarkers } from '../../services/DataService';
import CollapsibleChevron from '../CollapsibleChevron/CollapsibleChevron';
import { HeaderText, View, Text } from '../Themed';

type Props = {
  content: ScheduleData;
  isActive: boolean;
};

export const ActivityHeader = (props: Props) => {
  const mapMarkers = getMapMarkers('normal');
  return (
    <Animatable.View duration={400} transition="backgroundColor">
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <HeaderText style={styles.eventH3}>
              {props.content.time}
              {props.content.location
                ? ` - ${mapMarkers.get(props.content.location)?.title}`
                : null}
            </HeaderText>
          </View>
          <View>
            <CollapsibleChevron isActive={props.isActive} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <HeaderText style={styles.eventH1}>{props.content.name}</HeaderText>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  eventH3: {
    fontSize: 16,
    flex: 1,
  },
  eventH1: {
    fontSize: 32,
    fontWeight: 'normal',
    fontFamily: 'Quicksand_300Light',
    textTransform: 'uppercase',
    textAlign: 'left',
  },
});
