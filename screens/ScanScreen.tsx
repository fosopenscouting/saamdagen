import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, FlashMode } from 'expo-camera';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import QRFooterButton from '../components/Profile/QRFooterButton';
import QrIndicator from '../components/Profile/QrIndicator';
import { View } from '../components/Themed/Themed';
import { getTicketFromApi, storeTicket } from '../services/ticketService';

const ScanScreen: React.FC = () => {
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);
  const [ticketHash, setTicketHash] = useState<string | null>(null);
  const [isLit, setLit] = useState(false);

  useEffect(() => {
    if (ticketHash) {
      getTicketFromApi(ticketHash).then(async (res) => {
        await storeTicket(res, ticketHash);
        navigation.navigate('ProfileScreen');
      });
    }
  }, [ticketHash]);

  const onFlashToggle = React.useCallback(() => {
    setLit((isLit) => !isLit);
  }, []);

  const onCancel = React.useCallback(() => {
    navigation.goBack();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }): void => {
    setScanned(true);
    setTicketHash(data);
  };

  return (
    <View style={styles.container}>
      <Camera
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr], // Only allow scanning of QR codes, this causes less battery usage and false positives
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Prevents repeated scanning of the same code
        style={StyleSheet.absoluteFillObject}
        flashMode={isLit ? FlashMode.torch : FlashMode.off}
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
