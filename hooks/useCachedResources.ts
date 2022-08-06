import { Ionicons } from '@expo/vector-icons';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { getContentIndex } from '../api/api';
import { ONBOARDED_ITEM } from '../constants/Strings';
import { saveContent } from '../services/contentService';
import { useOnboardingStatus } from './useOnboardingStatus';

const useCachedResources: () => boolean = () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { isFirstLaunch, isLoading } = useOnboardingStatus();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          Andes: require('../assets/fonts/Andes.otf'),
          AndesLight: require('../assets/fonts/AndesLight.otf'),
          AndesBold: require('../assets/fonts/AndesBold.otf'),
        });

        if (!isLoading) {
          if (isFirstLaunch) {
            const fetchData = async () => {
              const index = await getContentIndex();
              await saveContent(index);
            };

            fetchData().catch(console.error);
            console.log('first launch');
            // Only set the onboarded item in prd, so we can test
            if (!__DEV__) {
              AsyncStorageLib.setItem(ONBOARDED_ITEM, JSON.stringify(true));
            }
          }
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, [isLoading]);

  return isLoadingComplete;
};

export default useCachedResources;
