import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React from 'react';

const checkIfFirstLaunched = async () => {
  try {
    const hasFirstLaunched = await AsyncStorageLib.getItem('@user_onboarded');
    if (hasFirstLaunched === null) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const useOnboardingStatus = (): {
  isFirstLaunch: boolean;
  isLoading: boolean;
} => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);
  const [isFirstLaunchLoading, setIsFirstLaunchLoading] = React.useState(true);

  React.useEffect(() => {
    async function check() {
      const result = await checkIfFirstLaunched();
      setIsFirstLaunch(result);
      setIsFirstLaunchLoading(false);
    }
    check();
  }, []);

  return {
    isFirstLaunch: isFirstLaunch,
    isLoading: isFirstLaunchLoading,
  };
};
