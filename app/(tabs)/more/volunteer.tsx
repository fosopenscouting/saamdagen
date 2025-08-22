import React, { useEffect, useState } from 'react';

import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Separator, View } from '@/components/Themed/Themed';
import { useDataContext } from '@/hooks/useDataContext';
import { ContentMetadata } from '@/models/ContentMetadata';
import { VOLUNTEER_ITEMS } from '@/constants/Strings';
import FaqCard from '@/components/FaqCard';

const VolunteerScreen: React.FC = () => {
  const { data, refreshContext, refreshing } = useDataContext();
  const [volunteerData, setVolunteerData] = useState<ContentMetadata>();

  useEffect(() => {
    if (data) {
      const filtered = data.filter((x) => x.key === VOLUNTEER_ITEMS)[0];
      setVolunteerData(filtered);
    }
  }, [data]);

  const handleRefresh = async () => {
    await refreshContext();
  };

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        keyExtractor={(item) => item.title}
        data={volunteerData?.content}
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
    height: 'auto',
  },
});
