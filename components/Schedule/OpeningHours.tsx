import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { ScheduleData } from '../../models/ScheduleData';
import CollapsibleChevron from '../CollapsibleChevron/CollapsibleChevron';
import { HeaderText, Markdown } from '../Themed';

type Props = {
  openingHours: ScheduleData | undefined;
};

export const OpeningHours: React.FC<Props> = (props: Props) => {
  const [hideOverview, setHideOverview] = useState<boolean>(false);

  const handleHidePress = () => {
    setHideOverview(!hideOverview);
  };

  return (
    <>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={handleHidePress}>
            <HeaderText style={styles.eventH2}>
              ALGEMENE OPENINGSUREN
            </HeaderText>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleHidePress}>
            <CollapsibleChevron isActive={!hideOverview} />
          </TouchableOpacity>
        </View>
      </View>
      <Collapsible collapsed={hideOverview}>
        <View style={styles.container}>
          <Markdown>{props.openingHours?.description}</Markdown>
        </View>
      </Collapsible>
    </>
  );
};

const styles = StyleSheet.create({
  eventH2: {
    fontSize: 24,
    fontWeight: 'normal',
    fontFamily: 'Quicksand_300Light',
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
});
