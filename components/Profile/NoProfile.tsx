import React from 'react';
import { View, Separator, HeaderText } from '../Themed/Themed';
import { Text } from '../Themed/Text';
import { Linking, StyleSheet } from 'react-native';
import useColorScheme from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import requestCameraPermissionsAsync from '@/utils/requestCameraPermissionsAsync';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { useAlerts } from 'react-native-paper-alerts';

const NoProfile: React.FC = () => {
  const alerts = useAlerts();

  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleScanPress = async () => {
    if (await requestCameraPermissionsAsync()) {
      router.navigate('/more/scan');
    } else {
      alerts.alert(
        'Opgelet!',
        'Om je ticket te kunnen scannen, moet je toegang geven tot je camera.\n\nGeef toegang tot je camera via de instellingen van je apparaat.',
        [
          {
            text: 'Instellingen',
            onPress: async () => {
              await Linking.openSettings();
            },
          },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <Separator />
      <HeaderText style={styles.title} variant="headlineLarge">
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
};

export default NoProfile;

const styles = StyleSheet.create({
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
    textAlign: 'center',
    marginBottom: 5,
  },
});
