import React from 'react';
import NotificationsItem from '@/components/Notifications/Item';
import { Separator, View } from '@/components/Themed/Themed';
import { useDataContext } from '@/hooks/useDataContext';
import { FlatList, StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed/Text';

const Notifications: React.FC = () => {
  const { recentNotifications, refreshContext, refreshing } = useDataContext();
  const handleRefresh = async () => {
    await refreshContext();
  };

  return (
    <View style={styles.container}>
      {recentNotifications.length > 0 ? (
        <FlatList
          data={recentNotifications}
          keyExtractor={({ id }, index) => `${index}_${id}`}
          renderItem={({ item }) => <NotificationsItem {...item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ItemSeparatorComponent={() => <Separator marginVertical={1} />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Nog geen recente meldingen</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
  },
  emptyContainer: {
    flex: 1,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Notifications;
