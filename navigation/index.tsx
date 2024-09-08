/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
	NavigationContainer,
	DefaultTheme as NavigationDefaultTheme,
	DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {
	MD3DarkTheme as PaperDarkTheme,
	MD3LightTheme as PaperDefaultTheme,
	Provider as PaperProvider,
	adaptNavigationTheme
} from 'react-native-paper';
import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme
})

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

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
	return (
		<PaperProvider
			theme={
				colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
			}
		>
			<NavigationContainer
				linking={LinkingConfiguration}
				theme={
					colorScheme === 'dark'
						? CustomDarkTheme
						: CustomDefaultTheme
				}
			>
				<RootNavigator />
			</NavigationContainer>
		</PaperProvider>
	);
};

export default Navigation;

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Root" component={BottomTabNavigator} />
			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>
		</Stack.Navigator>
	);
}
