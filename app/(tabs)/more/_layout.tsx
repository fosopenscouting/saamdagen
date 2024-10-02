import React from 'react';

import { Stack, useFocusEffect } from 'expo-router';
import SaamdagenAppbar from '@/components/SaamdagenAppbar';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { setStatusBarStyle } from 'expo-status-bar';

export const unstable_settings = {
<<<<<<< HEAD
	initialRouteName: 'index'
}

export default function MoreLayout() {
    const colorScheme = useColorScheme()

	useFocusEffect(() => {
		setStatusBarStyle(colorScheme == 'light' ? 'dark' : 'light')
	})

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
		</Stack>
	);
=======
  initialRouteName: 'index',
};

export default function MoreLayout() {
  const colorScheme = useColorScheme();

  useFocusEffect(() => {
    setStatusBarStyle(colorScheme == 'light' ? 'dark' : 'light');
  });

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
    </Stack>
  );
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
}
