<<<<<<< HEAD
import React, { useState } from 'react';
import { View } from '@/components/Themed/Themed';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
=======
import React from 'react';
import { View } from '@/components/Themed/Themed';
import { Image, StyleSheet } from 'react-native';
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
import Constants from 'expo-constants';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { Text } from 'react-native-paper';
import { Link } from 'expo-router';

const SettingsScreen: React.FC = () => {
<<<<<<< HEAD
	const colorScheme = useColorScheme();
	const versionColor = Colors[colorScheme].muted;

	const [pressesVersion, setPressesVersion] = useState<number>(0);
	const onPressVersion = () => {
		setPressesVersion(prev => prev + 1)

		if(pressesVersion == 5){
			setPressesVersion(0)
			Alert.alert('Hey', 'Hier is de easter-egg!')
		}
	}

	return (
		<View style={styles.container}>
			<Image
				style={styles.FOSlogo}
				source={require('@/assets/images/FOS_logo.png')}
			/>
			<View style={styles.innerContainer}>
				<Text variant="headlineLarge" style={styles.title}>
					Dé Saamdagen-App
				</Text>
				<Text style={styles.text}>
                    Met veel liefde gemaakt door de ICT-werkgroep.
				</Text>
				<Text>
                    Wist je trouwens dat de volledige sourcecode voor deze app te vinden is op GitHub?
				</Text>
				<Text style={styles.text}>
                    Je kan 'm hier terugvinden: <Link style={styles.link} href="https://github.com/fosopenscouting/saamdagen">@fosopenscouting/saamdagen</Link>
				</Text>
				<Text>
					&copy; FOS Open Scouting - { new Date().getFullYear() }
				</Text>
			</View>
			<TouchableOpacity onPress={onPressVersion}>
				<Text style={[styles.version, { color: versionColor }]}>
					v{Constants.expoConfig?.version}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	FOSlogo: {
		marginTop: 8,
		height: '40%',
		width: '100%',
		resizeMode: 'contain',
		alignContent: 'center',
	},
	title: {
		textAlign: 'center',
		marginBottom: 16,
	},
    text: {
        marginBottom: 8
    },
    link: {
        color: Colors.FOSCOLORS.FOS_BLUE
    },
	innerContainer: {
		flex: 1,
		marginTop: 8,
		marginHorizontal: 16,
		// backgroundColor: 'red'
	},
	version: {
		textAlign: 'center',
		marginBottom: 8,
	},
=======
  const colorScheme = useColorScheme();
  const versionColor = Colors[colorScheme].muted;

  return (
    <View style={styles.container}>
      <Image
        style={styles.FOSlogo}
        source={require('@/assets/images/FOS_logo.png')}
      />
      <View style={styles.innerContainer}>
        <Text variant="headlineLarge" style={styles.title}>
          Dé Saamdagen-App
        </Text>
        <Text style={styles.text}>
          Met veel liefde gemaakt door de ICT-werkgroep.
        </Text>
        <Text>
          Wist je trouwens dat de volledige sourcecode voor deze app te vinden
          is op GitHub?
        </Text>
        <Text style={styles.text}>
          Je kan 'm hier terugvinden:{' '}
          <Link
            style={styles.link}
            href="https://github.com/fosopenscouting/saamdagen"
          >
            @fosopenscouting/saamdagen
          </Link>
        </Text>
        <Text>&copy; FOS Open Scouting - {new Date().getFullYear()}</Text>
      </View>
      <Text style={[styles.version, { color: versionColor }]}>
        v{Constants.expoConfig?.version}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  FOSlogo: {
    marginTop: 8,
    height: '40%',
    width: '100%',
    resizeMode: 'contain',
    alignContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    marginBottom: 8,
  },
  link: {
    color: Colors.FOSCOLORS.FOS_BLUE,
  },
  innerContainer: {
    flex: 1,
    marginTop: 8,
    marginHorizontal: 16,
    // backgroundColor: 'red'
  },
  version: {
    textAlign: 'center',
    marginBottom: 8,
  },
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
});

export default SettingsScreen;
