import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_600SemiBold,
  Quicksand_500Medium,
} from '@expo-google-fonts/quicksand';
import { Linking } from 'react-native';
import useBackgroundRefresh from './hooks/useBackgroundRefresh';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://b852c07fe977471c96a3fb2dc1e10a49@o446803.ingest.sentry.io/4505356514426880',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

export default function App(): React.ReactElement | null {
  const isLoadingComplete = useCachedResources();
  useBackgroundRefresh();
  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_600SemiBold,
    Quicksand_500Medium,
  });
  const colorScheme = useColorScheme();

  useEffect(() => {
    Linking.getInitialURL().then(handleUrl);
  }, []);

  const handleUrl = (url: string | null) => {
    if (url) {
      const parsed = new URL(url);
    }
  };

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="light" />
        </SafeAreaProvider>
      </RootSiblingParent>
    );
  }
}
