/* eslint-disable react/no-children-prop */
import React from 'react';

import { View } from '../components/Themed';
import { ScrollView, StyleSheet } from 'react-native';
import FaqCard from '../components/FaqCard';
const loremIpsum = `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
Eveniet unde, eaque asperiores aliquid iste molestias corporis reiciendis
rem ipsa aspernatur nulla excepturi non?
Reiciendis soluta sunt maxime accusantium voluptatibus odio.`;

const FaqScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ paddingTop: 8, margin: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <FaqCard title={loremIpsum} text={loremIpsum}></FaqCard>
              <FaqCard title="WAT?" text={loremIpsum}></FaqCard>
              <FaqCard title="HOE?" text={loremIpsum}></FaqCard>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
});
