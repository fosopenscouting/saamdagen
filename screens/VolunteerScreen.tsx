/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';

import { Separator, View } from '../components/Themed/Themed';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import FaqCard from '../components/FaqCard';
import { useDataContext } from '../hooks/useDataContext';
import { VOLUNTEER_ITEMS } from '../constants/Strings';
import { ContentMetadata } from '../models/ContentMetadata';

const VolunteerScreen: React.FC = () => {
  const { data, refreshContext, refreshing } = useDataContext();
  const [VolunteerData, setVolunteerData] = useState<ContentMetadata>();

  useEffect(() => {
    if (data) {
      const filtered = data.filter((x) => x.key === VOLUNTEER_ITEMS)[0];
      console.log(filtered)

      setVolunteerData(filtered);
    }
  }, [data]);

  const handleRefresh = async () => {
    await refreshContext();
  };

  // Always try to refresh data on load. We can do it here because the screen is never unmounted in the bottom tab.
  useEffect(() => {
    const refreshAsync = async () => {
      await refreshContext();
    };
    refreshAsync();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        keyExtractor={(item) => item.title}
        data={VolunteerData?.content}
        renderItem={({ item }) => (
          <FaqCard title={item.title} text={item.content} icon={item.icon} />
        )}
        ItemSeparatorComponent={() => <Separator marginVertical={0} />}
        ListFooterComponent={() => <Separator marginVertical={0} />}
      />
    </View>
  );
};

export default VolunteerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
});
