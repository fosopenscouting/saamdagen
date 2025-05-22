import React from 'react';

import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
} from '@expo-google-fonts/quicksand';
import * as Sentry from '@sentry/react-native';
import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useRouter,
  Stack,
  useNavigationContainerRef,
  useFocusEffect,
  router,
} from 'expo-router';
import { RootSiblingParent } from 'react-native-root-siblings';
import { DataContextProvider } from '@/hooks/useDataContext';
import { StatusBar } from 'expo-status-bar';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  ThemeProvider,
} from '@react-navigation/native';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import useColorScheme from '@/hooks/useColorScheme';
import useCachedResources from '@/hooks/useCachedResources';
import { isRunningInExpoGo } from 'expo';
import { AlertsProvider } from 'react-native-paper-alerts';
import { ToastProvider } from 'react-native-paper-toast';
import { darkTheme, lightTheme } from '@/constants/PaperTheme';
import { getSettings } from '@/services/settingsService';
import { registerToken } from '@/services/notificationTokenService';

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

function handleRegistrationError(errorMessage: string) {
  //alert(errorMessage);
  console.error(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError(
        'Permission not granted to get push token for push notification!',
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      await registerToken(pushTokenString, true);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url as string;
      if (url) router.push(url);
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) return;

      redirect(response.notification);
    });

    const subscriber = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      },
    );

    return () => {
      isMounted = false;
      subscriber.remove();
    };
  }, []);
}

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(PaperDefaultTheme, LightTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, DarkTheme);

const CustomDarkTheme = {
  ...PaperDarkTheme,
  mode: 'exact',
  colors: darkTheme.colors,
  fonts: {
    ...CombinedDarkTheme.fonts,
    regular: {
      fontFamily: 'Quicksand_400Regular',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Quicksand_500Medium',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'Quicksand_300Light',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Quicksand_300Light',
      fontWeight: '300',
    },
  },
};

const CustomDefaultTheme = {
  ...CombinedDefaultTheme,
  colors: lightTheme.colors,
  fonts: {
    ...CombinedDefaultTheme.fonts,
    regular: {
      fontFamily: 'Quicksand_400Regular',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Quicksand_500Medium',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'Quicksand_300Light',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Quicksand_300Light',
      fontWeight: '300',
    },
  },
};

const RootLayout = () => {
  useNotificationObserver();

  const isLoadingComplete = useCachedResources();
  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
  });
  const colorScheme = useColorScheme();

  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  //Notificaties
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener =
    useRef<Notifications.EventSubscription>(undefined);
  const responseListener = useRef<Notifications.EventSubscription>(undefined);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ''))
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
      notificationListener.current && notificationListener.current.remove();
      responseListener.current && responseListener.current.remove();
    };
  }, []);

  const router = useRouter();
  useFocusEffect(() => {
    const checkOnboarding = async () => {
      const settings = await getSettings();

      if (!settings.SHOWN_ONBOARDING || settings.SHOWN_ONBOARDING == undefined)
        router.replace('/onboarding');
    };

    checkOnboarding();
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <DataContextProvider>
          <GestureHandlerRootView>
            <PaperProvider
              theme={
                colorScheme == 'dark' ? CustomDarkTheme : CustomDefaultTheme
              }
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
  }
};

export default Sentry.wrap(RootLayout);
