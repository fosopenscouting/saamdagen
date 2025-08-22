import React from 'react';
import { View } from 'react-native';
import { HeaderText } from '../Themed/Themed';
import { ScheduleData } from '@/models/ScheduleData';
import { Text } from '../Themed/Text';

interface MultipleActivitiesProps {
  index: number;
  i: number;
  evt: ScheduleData;

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  passedRef: any;
}

const MultipleActivities: React.FC<MultipleActivitiesProps> = (
  props: MultipleActivitiesProps,
) => {
  return (
    <View
      collapsable={false}
      {...props.passedRef}
      style={{
        margin: 0,
        marginBottom: 10,
      }}
      key={`timeline_${props.index}_${props.i}_rootview`}
    >
      <HeaderText
        variant="bodyLarge"
        key={`timeline_${props.index}_${props.i}_name`}
      >
        - {props.evt.name}
      </HeaderText>
      <HeaderText
        variant="bodyMedium"
        key={`timeline_${props.index}_${props.i}_header`}
        style={{
          marginLeft: 10,
        }}
      >
        {typeof props.evt.time == 'string' ? (
          <>{props.evt.time}</>
        ) : (
          <>
            {props.evt.time.start}{' '}
            {props.evt.time.eind ? `t.e.m. ${props.evt.time.eind}` : ''}
          </>
        )}
      </HeaderText>
      <Text
        key={`timeline_${props.index}_${props.i}_description`}
        style={{
          marginLeft: 10,
        }}
      >
        {props.evt.description}
      </Text>
    </View>
  );
};

export default MultipleActivities;
