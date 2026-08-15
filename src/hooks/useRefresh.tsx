import NetInfo from '@react-native-community/netinfo';
import { useState, useCallback } from 'react';
import { useToast } from 'react-native-paper-toast';
import { getContentIndex } from '@/api/api';
import { saveContent } from '@/services/contentService';

const useRefresh = (): {
  refreshing: boolean;
  refresh: () => Promise<void>;
} => {
  const [refreshing, setRefreshing] = useState(false);
  const toaster = useToast();

  const refresh = useCallback(async () => {
    try {
      const info = await NetInfo.fetch();
      setRefreshing(true);
      if (info.isConnected) {
        const index = await getContentIndex();
        await saveContent(index);
        toaster.show({
          message: 'Inhoud werd vernieuwd!',
          duration: 1000,
          type: 'info',
        });
      } else {
        toaster.show({
          message: 'Je bent niet verbonden met het internet.',
          duration: 1000,
          type: 'warning',
        });
      }
    } catch (e) {
      toaster.show({
        message: 'Er ging iets fout bij het ophalen van de inhoud.',
        duration: 1000,
        type: 'error',
      });
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return { refreshing, refresh };
};

export default useRefresh;
