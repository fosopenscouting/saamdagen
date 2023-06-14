import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

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
