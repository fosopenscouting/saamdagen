import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import * as SplashScreen from 'expo-splash-screen';
import Navigation from './navigation';

export default function App(): React.ReactElement | null {
  SplashScreen.preventAutoHideAsync();

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    SplashScreen.hideAsync();
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}
