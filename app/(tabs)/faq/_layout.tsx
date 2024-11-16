import React from 'react';

import { Stack } from 'expo-router';
import SaamdagenAppbar from '@/components/SaamdagenAppbar';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function MoreLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack
        screenOptions={{
          header: (props) => <SaamdagenAppbar {...props} />,
          headerStyle: Colors[colorScheme].tabBarStyle,
          headerTitleStyle: {
            fontFamily: 'Quicksand_600SemiBold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: 'Info',
          }}
        />
      </Stack>
    </>
  );
}
