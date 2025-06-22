import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSettings } from './settingsService';

const NOTIFICATION_SERVER = process.env.EXPO_PUBLIC_NOTIFICATION_SERVER!;

export const registerToken = async (
  token: string,
  localOnly: boolean = false,
) => {
  await AsyncStorage.setItem('PUSH_TOKEN', token);

  if (!localOnly)
    await fetch(`${NOTIFICATION_SERVER}/api/pushToken`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });
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
    }),
  });
};

export const updateNotificationSettings = async () => {
  const settings = await getSettings();
  const token = await AsyncStorage.getItem('PUSH_TOKEN');

  if (settings.MESSAGING) {
    if (token === null) return;

    await registerToken(token);
  } else {
    await unregisterToken(token);
  }
};
