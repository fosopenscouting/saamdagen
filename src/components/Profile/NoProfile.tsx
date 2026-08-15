import React, { useState } from 'react';
import { View, Separator, HeaderText } from '../Themed/Themed';
import { Text } from '../Themed/Text';
import { StyleSheet } from 'react-native';
import useColorScheme from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useFocusEffect, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { useAlerts } from 'react-native-paper-alerts';
import NetInfo from '@react-native-community/netinfo';
import { useCameraPermissions } from 'expo-camera';

const NoProfile: React.FC = () => {
  const alerts = useAlerts();

  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useFocusEffect(() => {
    (async () => {
      const status = await NetInfo.fetch();
      if (status.isConnected) setIsConnected(status.isConnected);
    })();
  });

  const handleScanPress = async () => {
    if (permission?.granted) {
      router.navigate('/more/scan');
    } else {
      alerts.alert(
        'Opgelet!',
        'Om je ticket te kunnen scannen, moet je toegang geven tot je camera.\n\nGeef toegang tot je camera via de instellingen van je apparaat.',
        [
          {
            text: 'Instellingen',
            onPress: async () => {
              await requestPermission();
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
        Helemaal klaar voor Saamdagen?
      </HeaderText>
      <Text style={styles.text}>
        Scan jouw ticket om je workshops hier te zien. Doe dit op voorhand want
        je hebt een werkende internetconnectie nodig!
      </Text>
      <Separator />
      {!isConnected ? (
        <Button
          buttonColor={Colors[colorScheme].tabBarStyle.backgroundColor}
          textColor="white"
          mode="contained"
          icon="wifi-strength-alert-outline"
          onPress={handleScanPress}
          disabled={true}
        >
          Geen internet
        </Button>
      ) : (
        <Button
          buttonColor={Colors[colorScheme].tabBarStyle.backgroundColor}
          textColor="white"
          mode="contained"
          icon="qrcode-scan"
          onPress={handleScanPress}
        >
          Ticket scannen
        </Button>
      )}
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
