import React, { useEffect, useState } from 'react';
import { HeaderText, View } from '@/components/Themed/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Constants from 'expo-constants';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { Link } from 'expo-router';
import { Text } from '@/components/Themed/Text';
import { useAlerts } from 'react-native-paper-alerts';

const SettingsScreen: React.FC = () => {
  const alerts = useAlerts();

  const colorScheme = useColorScheme();
  const versionColor = Colors[colorScheme].muted;

  const [pressesVersion, setPressesVersion] = useState<number>(0);

  useEffect(() => {
    if (pressesVersion >= 5) {
      setPressesVersion(0);

      alerts.alert(
        'Hey jij!',
        "Jij hebt de easter-egg gevonden! \nBen je ook zo'n fan van technologie? Misschien kan je de ICT-werkgroep wel versterken!",
        [
          {
            text: 'Sluiten',
            style: 'cancel',
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  }, [pressesVersion]);

  const onPressVersion = () => {
    setPressesVersion((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.FOSlogo}
        contentFit="contain"
        source={require('@/assets/images/FOS_logo.png')}
      />
      <View style={styles.innerContainer}>
        <HeaderText variant="headlineLarge" style={styles.title}>
          Dé Saamdagen app
        </HeaderText>
        <Text style={styles.text}>
          Met veel liefde gemaakt door de ICT-werkgroep.
        </Text>
        <Text>
          Wist je trouwens dat de volledige sourcecode voor deze app op GitHub
          staat?
        </Text>
        <Text style={styles.text}>
          Je kan &apos;m hier terugvinden:{' '}
          <Link
            style={styles.link}
            href="https://github.com/fosopenscouting/saamdagen"
          >
            @fosopenscouting/saamdagen
          </Link>
        </Text>
        <Text>&copy; FOS Open Scouting - {new Date().getFullYear()}</Text>
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
    marginTop: 16,
    height: '40%',
    width: '100%',
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
    // color: Colors.FOSCOLORS.FOS_BLUE,
    textDecorationLine: 'underline',
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
});

export default SettingsScreen;
