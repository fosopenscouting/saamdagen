/* eslint-disable react/no-children-prop */
import React from 'react';

import { Separator, View } from '../components/Themed';
import { FlatList, StyleSheet } from 'react-native';
import FaqCard from '../components/FaqCard';
import { useContent } from '../hooks/useContent';
import { FaqItem } from '../models/FaqItem';
import { FAQ_ITEMS } from '../constants/Strings';
const loremIpsum = `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
Eveniet unde, eaque asperiores aliquid iste molestias corporis reiciendis
rem ipsa aspernatur nulla excepturi non?
Reiciendis soluta sunt maxime accusantium voluptatibus odio.`;

const dummyFaq = [
  {
    title: 'FAQ 1',
    content: loremIpsum,
  },
  {
    title: 'FAQ 2',
    content: loremIpsum,
  },
  {
    title: 'FAQ 3',
    content: loremIpsum,
  },
  {
    title: 'FAQ 4',
    content: loremIpsum,
  },
];

const FaqScreen: React.FC = () => {
  const [content, lastUpdated] = useContent<FaqItem>(FAQ_ITEMS);
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.title}
        data={content}
        renderItem={({ item }) => (
          <FaqCard title={item.title} text={item.content} icon={item.icon} />
        )}
        ItemSeparatorComponent={() => <Separator marginVertical={0} />}
        ListFooterComponent={() => <Separator marginVertical={0} />}
      />
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
