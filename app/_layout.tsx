import React from 'react';

import {
	useFonts,
	Quicksand_300Light,
	Quicksand_400Regular,
	Quicksand_600SemiBold,
	Quicksand_500Medium,
} from '@expo-google-fonts/quicksand';
import * as Sentry from '@sentry/react-native';
import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
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

Sentry.init({
	dsn: 'https://b852c07fe977471c96a3fb2dc1e10a49@o446803.ingest.sentry.io/4505356514426880',
	debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

function handleRegistrationError(errorMessage: string) {
	//alert(errorMessage);
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
			return pushTokenString;
		} catch (e: unknown) {
			handleRegistrationError(`${e}`);
		}
	} else {
		handleRegistrationError(
			'Must use physical device for push notifications',
		);
	}
}

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(PaperDefaultTheme, LightTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, DarkTheme);

const CustomDarkTheme = {
	...CombinedDarkTheme,
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
	const isLoadingComplete = useCachedResources();
	const [fontsLoaded] = useFonts({
		Quicksand_300Light,
		Quicksand_400Regular,
		Quicksand_600SemiBold,
		Quicksand_500Medium,
	});
	const colorScheme = useColorScheme();

	//Notificaties
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState<
		Notifications.Notification | undefined
	>(undefined);
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();

	useEffect(() => {
		registerForPushNotificationsAsync()
			.then((token) => setExpoPushToken(token ?? ''))
			.catch((error: any) => setExpoPushToken(`${error}`));

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(
				(response) => {
					console.log(response);
				},
			);

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(
					notificationListener.current,
				);
			responseListener.current &&
				Notifications.removeNotificationSubscription(
					responseListener.current,
				);
		};
	}, []);

	if (!isLoadingComplete || !fontsLoaded) {
		return null;
	} else {
		return (
			<RootSiblingParent>
				<DataContextProvider>
					<GestureHandlerRootView>
						<PaperProvider
							theme={
								colorScheme == 'dark'
									? CustomDarkTheme
									: CustomDefaultTheme
							}
						>
							<ThemeProvider
								value={
									colorScheme == 'dark'
										? CustomDarkTheme
										: CustomDefaultTheme
								}
							>
								<Stack
									screenOptions={{
										headerShown: false,
									}}
								>
									<Stack.Screen name="(tabs)" />
								</Stack>
							</ThemeProvider>
						</PaperProvider>
					</GestureHandlerRootView>
					<StatusBar backgroundColor='transparent' animated={true} style="light" />
				</DataContextProvider>
			</RootSiblingParent>
		);
	}
};

export default Sentry.wrap(RootLayout);
