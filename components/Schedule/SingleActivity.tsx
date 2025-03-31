import { GroupedEvents } from '@/screens/DayScreen';
import React from 'react';
import { View } from 'react-native';
import { HeaderText } from '../Themed/Themed';
import { Text } from '../Themed/Text';

interface SingleActivityProps {
  index: number;
  evts: GroupedEvents;
  passedRef: any;
}

const SingleActivity: React.FC<SingleActivityProps> = (
  props: SingleActivityProps,
) => {
  return (
    <View
      collapsable={false}
      {...props.passedRef}
      style={{
        margin: 0,
      }}
    >
      <HeaderText variant="bodyMedium">
        {typeof props.evts.events[0].time == 'string' ? (
          <>{props.evts.events[0].time}</>
        ) : (
          <>
            {props.evts.events[0].time.start}{' '}
            {props.evts.events[0].time.eind
              ? `t.e.m. ${props.evts.events[0].time.eind}`
              : ''}
          </>
        )}
      </HeaderText>
      <Text>
        {props.evts.events[0].description}
      </Text>
    </View>
  );
};

export default SingleActivity;
