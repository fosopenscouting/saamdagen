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
import { getContent, getContentIndex } from './api/api';
import { saveContent } from './services/contentService';

export default function App(): React.ReactElement | null {
  const isLoadingComplete = useCachedResources();
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

  // Here temporarily to test if everything works. Should come somewhere else on app load
  useEffect(() => {
    const fetchData = async () => {
      const index = await getContentIndex();
      await saveContent(index);
    };

    fetchData().catch(console.error);
  }, []);

  const handleUrl = (url: any) => {
    const parsed = new URL(url);
    console.log(parsed.searchParams);
  };

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}
