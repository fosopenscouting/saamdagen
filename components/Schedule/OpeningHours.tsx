import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScheduleData } from '@/models/ScheduleData';
import CollapsibleChevron from '../CollapsibleChevron/CollapsibleChevron';
import { Markdown } from '../Themed/Themed';
import { List } from 'react-native-paper';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

type Props = {
  openingHours: ScheduleData | undefined;
};

export const OpeningHours: React.FC<Props> = (props: Props) => {
  const colorScheme = useColorScheme();

  return (
    <List.Accordion
      style={{
        backgroundColor: Colors[colorScheme].background,
        paddingVertical: 0,
        paddingLeft: 0,
        paddingRight: 0,
      }}
      titleStyle={{
        fontFamily: 'Quicksand_600SemiBold',
        fontSize: 24,
        textTransform: 'uppercase',
        textAlign: 'center',
      }}
      //eslint-disable-next-line react/prop-types
      right={(props) => <CollapsibleChevron isActive={props.isExpanded} />}
      title="ALGEMENE OPENINGSUREN"
    >
      <View style={styles.container}>
        <Markdown>{props.openingHours?.description}</Markdown>
      </View>
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
