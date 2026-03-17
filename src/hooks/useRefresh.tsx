import NetInfo from '@react-native-community/netinfo';
import { useState, useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { getContentIndex } from '@/api/api';
import { saveContent } from '@/services/contentService';

const useRefresh = (): {
  refreshing: boolean;
  refresh: () => Promise<void>;
} => {
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
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
      }
    } catch (e) {
      Toast.show('Er ging iets fout bij het ophalen van de inhoud.', {
        duration: Toast.durations.SHORT,
      });
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return { refreshing, refresh };
};

export default useRefresh;
