import React from 'react';
import { View, Separator, HeaderText } from '../Themed/Themed';
import { Text } from '../Themed/Text';
import { StyleSheet } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import requestCameraPermissionsAsync from '../../utils/requestCameraPermissionsAsync';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';

const NoProfile: React.FC = () => {
<<<<<<< HEAD
	const colorScheme = useColorScheme();
	const router = useRouter();

	const handleScanPress = async () => {
		if (await requestCameraPermissionsAsync()) {
			router.navigate('/more/scan');
		} else {
			// TODO: replace with better alert
			alert(
				'Om je ticket te kunnen scannen, moet je toegang geven tot je camera. Geef toegang tot je camera via de instellingen van je apparaat',
			);
		}
	};

	return (
		<View style={styles.container}>
			<Separator />
			<HeaderText style={styles.title}>
				Naar welke workshop of activiteit ga jij?
			</HeaderText>
			<Text style={styles.text}>
				Scan jouw ticket om je workshops en activiteiten hier te zien.
				Doe dit op voorhand: je hebt een werkende internetconnectie
				nodig.
			</Text>
			<Separator />
			<Button
				buttonColor={Colors[colorScheme].tabBarStyle.backgroundColor}
				textColor='white'
				mode='contained'
				icon="qrcode-scan"
				onPress={handleScanPress}
			>Ticket scannen</Button>
		</View>
	);
=======
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleScanPress = async () => {
    if (await requestCameraPermissionsAsync()) {
      router.navigate('/more/scan');
    } else {
      // TODO: replace with better alert
      alert(
        'Om je ticket te kunnen scannen, moet je toegang geven tot je camera. Geef toegang tot je camera via de instellingen van je apparaat',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Separator />
      <HeaderText style={styles.title}>
        Naar welke workshop of activiteit ga jij?
      </HeaderText>
      <Text style={styles.text}>
        Scan jouw ticket om je workshops en activiteiten hier te zien. Doe dit
        op voorhand: je hebt een werkende internetconnectie nodig.
      </Text>
      <Separator />
      <Button
        buttonColor={Colors[colorScheme].tabBarStyle.backgroundColor}
        textColor="white"
        mode="contained"
        icon="qrcode-scan"
        onPress={handleScanPress}
      >
        Ticket scannen
      </Button>
    </View>
  );
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
};

export default NoProfile;

const styles = StyleSheet.create({
<<<<<<< HEAD
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		paddingHorizontal: '10%'
	},
	text: {
		textAlign: 'center',
	},
	title: {
		fontSize: 15,
		fontFamily: 'Quicksand_600SemiBold',
		textAlign: 'center',
	},
=======
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: '10%',
  },
  text: {
    textAlign: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Quicksand_600SemiBold',
    textAlign: 'center',
  },
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
});
