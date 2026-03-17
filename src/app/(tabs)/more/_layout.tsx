import React from 'react';

import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import SaamdagenAppbar from '@/components/SaamdagenAppbar';
import { Appbar } from 'react-native-paper';
import { useDataContext } from '@/hooks/useDataContext';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function MoreLayout() {
  const colorScheme = useColorScheme();
  const { refreshContext } = useDataContext();

  return (
    <Stack
      screenOptions={{
        header: (props) => <SaamdagenAppbar {...props} />,
        headerTintColor: Colors[colorScheme].tabTextColor,
        headerStyle: Colors[colorScheme].tabBarStyle,
        headerTitleStyle: {
          fontFamily: 'Quicksand_600SemiBold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Meer',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: 'Mijn Saamdagen',
        }}
      />
      <Stack.Screen
        name="scan"
        options={{
          headerTitle: 'Ticket scannen',
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          headerTitle: 'Over',
        }}
      />
      <Stack.Screen
        name="licenses"
        options={{
          headerTitle: 'Licenties',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: 'Instellingen',
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          headerTitle: 'Recente meldingen',
          headerRight: () => (
            <Appbar.Action
              icon="refresh"
              color="#fff"
              onPress={async () => {
                await refreshContext();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="volunteer"
        options={{
          headerTitle: 'Medewerker',
        }}
      />
    </Stack>
  );
}
