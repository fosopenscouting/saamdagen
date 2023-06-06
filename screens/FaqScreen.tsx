/* eslint-disable react/no-children-prop */
import React from 'react';

import { Separator, View } from '../components/Themed/Themed';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import FaqCard from '../components/FaqCard';
import { useContent } from '../hooks/useContent';
import { FaqItem } from '../models/FaqItem';
import { FAQ_ITEMS } from '../constants/Strings';
import useRefresh from '../hooks/useRefresh';

const FaqScreen: React.FC = () => {
  const { content, refreshContent } = useContent<FaqItem>(FAQ_ITEMS);
  const { refreshing, refresh } = useRefresh();

  const handleRefresh = async () => {
    await refresh();
    refreshContent();
  };
  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
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
