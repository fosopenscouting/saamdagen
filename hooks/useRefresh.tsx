import NetInfo from '@react-native-community/netinfo';
import React from 'react';
import Toast from 'react-native-root-toast';
import { getContentIndex } from '../api/api';
import { saveContent } from '../services/contentService';

const useRefresh = (): {
  refreshing: boolean;
  refresh: () => Promise<void>;
} => {
  const [refreshing, setRefreshing] = React.useState(false);

  const refresh = React.useCallback(async () => {
    try {
      const info = await NetInfo.fetch();
      setRefreshing(true);
      if (info.isConnected) {
        const index = await getContentIndex();
        await saveContent(index);
        Toast.show('Inhoud werd vernieuwd!', {
          duration: Toast.durations.SHORT,
        });
      } else {
        Toast.show('Je bent niet verbonden met het internet.', {
          duration: Toast.durations.SHORT,
        });
        console.log('not connected');
      }
    } catch (e) {
      Toast.show('Er ging iets fout bij het ophalen van de inhoud.', {
        duration: Toast.durations.SHORT,
      });
      console.error(e);
    } finally {
      console.log('done');
      setRefreshing(false);
    }
  }, []);

  return { refreshing, refresh };
};

export default useRefresh;
