import React from 'react';
import { ScheduleData } from '../../models/ScheduleData';
import * as Animatable from 'react-native-animatable';
import { Markdown } from '../Themed/Themed';
import { StyleSheet } from 'react-native';

export const ActivityContent = (content: ScheduleData) => {
  return (
    <Animatable.View
      duration={400}
      style={styles.content}
      transition="backgroundColor"
    >
      <Markdown>{content.description}</Markdown>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginBottom: 5,
  },
});
