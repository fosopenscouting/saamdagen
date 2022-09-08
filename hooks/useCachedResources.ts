import { Ionicons } from '@expo/vector-icons';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { getContentIndex } from '../api/api';
import {
  FAQ_ITEMS,
  HOME_ITEMS,
  ONBOARDED_ITEM,
  PROGRAM_ITEMS,
  MAP_ITEMS,
} from '../constants/Strings';
import { saveContent } from '../services/contentService';
import { useOnboardingStatus } from './useOnboardingStatus';

const useCachedResources: () => boolean = () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { isFirstLaunch, isLoading } = useOnboardingStatus();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    loadResourcesAndDataAsync();

    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        const keys = await AsyncStorageLib.getAllKeys();
        const hasData =
          keys.includes(HOME_ITEMS) &&
          keys.includes(PROGRAM_ITEMS) &&
          keys.includes(FAQ_ITEMS) &&
          keys.includes(MAP_ITEMS);
        if (isFirstLaunch || !hasData) {
          const fetchData = async () => {
            const index = await getContentIndex();
            await saveContent(index);
          };

          await fetchData().catch(console.error);
          console.log('first launch');
          // Only set the onboarded item in prd, so we can test
          if (!__DEV__) {
            await AsyncStorageLib.setItem(ONBOARDED_ITEM, JSON.stringify(true));
          }
        } else {
          console.log('not first launch');
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }
  }, [isLoading]);

  return isLoadingComplete;
};

export default useCachedResources;
