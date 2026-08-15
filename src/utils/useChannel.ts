import AsyncStorage from '@react-native-async-storage/async-storage';

export type Channel = 'Staging' | 'Production';

export const useChannel = async (): Promise<Channel> => {
  try {
    const value = await AsyncStorage.getItem('channel');

    if (value !== null) return value as Channel;
    else changeChannel('Production');
  } catch (e) {
    console.error('Error reading channel, defaulting to Production');
    console.error(e);
  }

  return 'Production';
};

export const changeChannel = async (channel: Channel) => {
  try {
    await AsyncStorage.setItem('channel', channel);
  } catch (e) {
    console.error('Error writing chanel');
    throw e;
  }
};
