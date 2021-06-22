import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import QRFooterButton from '../components/Profile/QRFooterButton';
import QrIndicator from '../components/Profile/QrIndicator';
import { View } from '../components/Themed';
import { Ticket } from '../models/Ticket';
// TODO: add a cancel button
// TODO: add a way to turn the flash of the phone on or off
const ScanScreen: React.FC = () => {
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);
  const [ticketData, setTicketData] = useState<string | null>(null);
  const [isLit, setLit] = useState(false);

  useEffect(() => {
    // TODO: move this to a routed screen that gets the ticket from the api and stores it. That way we can enable deep linking from an url as well.
    if (ticketData) {
      fetch(`https://ticketing.fos.be/api/ticket?hash=${ticketData}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then(
          async (data) =>
            await storeTicket(data).then(() =>
              navigation.navigate('ProfileScreen'),
            ),
        );
    }
  }, [ticketData]);

  const onFlashToggle = React.useCallback(() => {
    setLit((isLit) => !isLit);
  }, []);

  const onCancel = React.useCallback(() => {
    navigation.goBack();
  }, []);

  // Disabling type checking because the hassle is not worth it
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storeTicket = async (data: any): Promise<void> => {
    try {
      const ticket: Ticket = {
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        ticketType:
          data.data.submissionData.data.formValues.type_deelnemer_keuze,
        workshopBeforeNoon:
          data.data.submissionData.data.formValues.workshops_voormiddag,
        workshopAfterNoon:
          data.data.submissionData.data.formValues.workshops_namiddag,
        activityBeforeNoon:
          data.data.submissionData.data.formValues.activiteit_namiddag,
        activityAfterNoon:
          data.data.submissionData.data.formValues.activiteit_voormiddag,
      };
      await AsyncStorage.setItem('sd_ticket', JSON.stringify(ticket));
    } catch (e) {
      console.error(e);
    }
  };

  const handleBarCodeScanned = ({ data }: { data: string }): void => {
    setScanned(true);
    setTicketData(data);
  };

  return (
    <View style={styles.container}>
      <Camera
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr], // Only allow scanning of QR codes, this causes less battery usage and false positives
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Prevents repeated scanning of the same code
        style={StyleSheet.absoluteFillObject}
        flashMode={isLit ? 'torch' : 'off'}
      />
      <View style={[styles.footer, { bottom: 30 }]}>
        <QRFooterButton
          onPress={onFlashToggle}
          isActive={isLit}
          iconName="ios-flashlight"
        />
        <QRFooterButton onPress={onCancel} iconName="ios-close" iconSize={48} />
      </View>
      <QrIndicator />
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    backgroundColor: 'transparent',
  },
});
