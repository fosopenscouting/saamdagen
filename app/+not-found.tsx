/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NotFoundScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Ola! Wa is da hier?</Text>
			<Text style={styles.title}>De pagina waar je naartoe wou gaan is niet gevonden...</Text>
			<TouchableOpacity
				onPress={() => router.replace('/')}
				style={styles.link}
			>
				<Text style={styles.linkText}>Terug naar start!</Text>
			</TouchableOpacity>
		</View>
	);
};

export default NotFoundScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: "#fff"
	},
	header: {
		fontSize: 40,
		fontWeight: 'bold',
		marginBottom: 50,
		color: "#fff"
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: Colors.FOSCOLORS.FOS_GREEN,
	},
});
