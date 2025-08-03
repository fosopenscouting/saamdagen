import React from 'react';

import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import * as Sentry from '@sentry/react-native';
import { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useNavigationContainerRef, SplashScreen } from 'expo-router';
import { RootSiblingParent } from 'react-native-root-siblings';
import { DataContextProvider } from '@/hooks/useDataContext';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import useColorScheme from '@/hooks/useColorScheme';
import { isRunningInExpoGo } from 'expo';
import { AlertsProvider } from 'react-native-paper-alerts';
import { ToastProvider } from 'react-native-paper-toast';
import {
  registerForPushNotificationsAsync,
  useNotificationObserver,
} from '@/utils/notifications';
import { CustomDarkTheme, CustomDefaultTheme } from '@/utils/theme';

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

Sentry.init({
  dsn: process.env.EXPO_SENTRY_DSN,
  debug: false,
  tracesSampleRate: 1.0,
  integrations: [navigationIntegration],
  enableNativeFramesTracking: !isRunningInExpoGo(),
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  useNotificationObserver();

  // const isLoadingComplete = useCachedResources();
  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });
  const colorScheme = useColorScheme();

  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  //Notificaties

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener =
    useRef<Notifications.EventSubscription>(undefined);
  const responseListener = useRef<Notifications.EventSubscription>(undefined);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token: string | undefined) => setExpoPushToken(token ?? ''))
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      //eslint-disable-next-line @typescript-eslint/no-unused-expressions
      notificationListener.current && notificationListener.current.remove();
      //eslint-disable-next-line @typescript-eslint/no-unused-expressions
      responseListener.current && responseListener.current.remove();
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // if (!isLoadingComplete || !fontsLoaded) {
  //   return null;
  // }
  if (!fontsLoaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <DataContextProvider>
        <GestureHandlerRootView>
          <PaperProvider
            //@ts-expect-error Bug in react-native-paper with mode-option
            theme={colorScheme == 'dark' ? CustomDarkTheme : CustomDefaultTheme}
          >
            <ThemeProvider
              //@ts-expect-error Shut up please
              value={
                colorScheme == 'dark' ? CustomDarkTheme : CustomDefaultTheme
              }
            >
              <AlertsProvider>
                <ToastProvider>
                  <Stack
                    screenOptions={{
                      headerShown: false,
                    }}
                  />
                </ToastProvider>
              </AlertsProvider>
            </ThemeProvider>
          </PaperProvider>
        </GestureHandlerRootView>
        <StatusBar
          backgroundColor="transparent"
          animated={true}
          style="light"
        />
      </DataContextProvider>
    </RootSiblingParent>
  );
};

export default Sentry.wrap(RootLayout);
