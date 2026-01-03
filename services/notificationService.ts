import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSettings } from './settingsService';
import { DatabaseNotification } from '@/models/Notification';

const NOTIFICATION_SERVER = process.env.EXPO_PUBLIC_SAAMDAGEN_SERVER!;

export const registerToken = async (
  token: string,
  localOnly: boolean = false,
) => {
  await AsyncStorage.setItem('PUSH_TOKEN', token);

  if (!localOnly) {
    try {
      await fetch(`${NOTIFICATION_SERVER}/api/pushToken`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          development: __DEV__ ? true : false,
        }),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export const unregisterToken = async (token: string | null) => {
  if (token === null) return;

  await fetch(`${NOTIFICATION_SERVER}/api/pushToken`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token,
      development: __DEV__ ? true : false,
    }),
  });
};

export const updateNotificationSettings = async () => {
  const settings = await getSettings();
  const token = await AsyncStorage.getItem('PUSH_TOKEN');

  if (settings.MESSAGING) {
    if (token === null) {
      return;
    }

    await registerToken(token);
  } else {
    await unregisterToken(token);
  }
};

export const getRecentNotifications = async (): Promise<
  DatabaseNotification[]
> => {
  const url = new URL(
    `${process.env.EXPO_PUBLIC_SAAMDAGEN_SERVER}/api/notifications/recent`,
  );

  url.searchParams.set('limit', '15');

  if (__DEV__) url.searchParams.set('channel', 'Staging');
  else url.searchParams.set('channel', 'Production');

  const response = await fetch(url.toString());
  const data = await response.json();

  return data;
};
