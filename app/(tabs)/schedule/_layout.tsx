import React from 'react';

import { MaterialTopTabs } from '@/layout/material-top-tabs';
<<<<<<< HEAD
import {
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
=======
import { useSafeAreaInsets } from 'react-native-safe-area-context';
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';

export default function SheduleLayout() {
<<<<<<< HEAD
	const insets = useSafeAreaInsets();
	const colorScheme = useColorScheme();

	useFocusEffect(() => {
		setStatusBarBackgroundColor(Colors[colorScheme].tabBarStyle.backgroundColor, true)
	})


	return (
		<>
			<MaterialTopTabs
				style={{
					paddingTop: insets.top,
					paddingRight: insets.right,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
				}}
				screenOptions={{
					tabBarStyle: Colors[colorScheme].tabBarStyle,
					tabBarIndicatorStyle: {
						backgroundColor: Colors.FOSCOLORS.FOS_GREEN,
					},
					tabBarLabelStyle: {
						color: Colors[colorScheme].white
					}
				}}
			>
				<MaterialTopTabs.Screen
					name="friday"
					options={{
						title: 'Vrijdag',
					}}
					initialParams={{ day: 'Vrijdag' }}
				/>
				<MaterialTopTabs.Screen
					name="saturday"
					options={{
						title: 'Zaterdag',
					}}
					initialParams={{ day: 'Zaterdag' }}
				/>
				<MaterialTopTabs.Screen
					name="sunday"
					options={{
						title: 'Zondag',
					}}
					initialParams={{ day: 'Zondag' }}
				/>
			</MaterialTopTabs>
		</>
	);
=======
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  useFocusEffect(() => {
    setStatusBarBackgroundColor(
      Colors[colorScheme].tabBarStyle.backgroundColor,
      true,
    );
  });

  return (
    <>
      <MaterialTopTabs
        style={{
          paddingTop: insets.top,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
        }}
        screenOptions={{
          tabBarStyle: Colors[colorScheme].tabBarStyle,
          tabBarIndicatorStyle: {
            backgroundColor: Colors.FOSCOLORS.FOS_GREEN,
          },
          tabBarLabelStyle: {
            color: Colors[colorScheme].white,
          },
        }}
      >
        <MaterialTopTabs.Screen
          name="friday"
          options={{
            title: 'Vrijdag',
          }}
          initialParams={{ day: 'Vrijdag' }}
        />
        <MaterialTopTabs.Screen
          name="saturday"
          options={{
            title: 'Zaterdag',
          }}
          initialParams={{ day: 'Zaterdag' }}
        />
        <MaterialTopTabs.Screen
          name="sunday"
          options={{
            title: 'Zondag',
          }}
          initialParams={{ day: 'Zondag' }}
        />
      </MaterialTopTabs>
    </>
  );
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
}
