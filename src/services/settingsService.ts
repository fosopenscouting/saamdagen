import AsyncStorage from '@react-native-async-storage/async-storage';

export enum SettingKeys {
  FIREBASE_ANALYTICS = 'FIREBASE_ANALYTICS',
  MESSAGING = 'MESSAGING',
  SHOWN_ONBOARDING = 'SHOWN_ONBOARDING',
}
export type Settings = {
  [key in SettingKeys]?: boolean;
};

export const getSettings = async (): Promise<Settings> => {
  const settings = await AsyncStorage.getItem('settings');

  if (settings) return JSON.parse(settings);

  return {};
};

export const setSetting = async (key: SettingKeys, value: boolean) => {
  const settings = await getSettings();

  settings[key] = value;

  await AsyncStorage.setItem('settings', JSON.stringify(settings));
};
