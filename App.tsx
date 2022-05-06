import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useFonts, Quicksand_300Light } from '@expo-google-fonts/quicksand';

export default function App(): React.ReactElement | null {
  const isLoadingComplete = useCachedResources();
  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
  });
  const colorScheme = useColorScheme();

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
