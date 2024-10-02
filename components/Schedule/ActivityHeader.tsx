import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ScheduleData } from '../../models/ScheduleData';
import CollapsibleChevron from '../CollapsibleChevron/CollapsibleChevron';
import { HeaderText, View } from '../Themed/Themed';

type Props = {
  content: ScheduleData;
  isActive: boolean;
};

export const ActivityHeader: React.FC<Props> = (props: Props) => {
  return (
    <Animatable.View duration={400} transition="backgroundColor">
      <View
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <HeaderText style={styles.eventH3}>
            {props.content.time}
            {props.content.location ? ` - ${props.content.location}` : null}
          </HeaderText>
          <HeaderText style={styles.eventH1}>{props.content.name}</HeaderText>
        </View>
        <View>
          <CollapsibleChevron isActive={props.isActive} />
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
    marginBottom: 8,
  },
});
