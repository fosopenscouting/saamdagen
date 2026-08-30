import NetInfo from '@react-native-community/netinfo';
import { useState, useCallback } from 'react';
import { getContentIndex } from '@/api/api';
import { saveContent } from '@/services/contentService';
import { toast } from 'sonner-native';

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
        toast.info('Inhoud werd vernieuwd!', {
          duration: 1000,
        });
      } else {
        toast.warning('Je bent niet verbonden met het internet.', {
          duration: 1000,
        });
      }
    } catch (e) {
      toast.error('Er ging iets fout bij het ophalen van de inhoud.', {
        duration: 1000,
      });
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return { refreshing, refresh };
};

export default useRefresh;
