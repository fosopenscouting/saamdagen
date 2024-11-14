import { CameraView } from 'expo-camera';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import QRFooterButton from '@/components/Profile/QRFooterButton';
import QrIndicator from '@/components/Profile/QrIndicator';
import { View } from '@/components/Themed/Themed';
import { getTicketFromApi, storeTicket } from '@/services/ticketService';
import { useRouter } from 'expo-router';
import NetInfo from '@react-native-community/netinfo';
import * as Haptics from 'expo-haptics';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { ActivityIndicator } from 'react-native-paper';
import Colors from '@/constants/Colors';

const ScanScreen: React.FC = () => {
  const router = useRouter();
  const [scanned, setScanned] = useState(false);
  const [ticketHash, setTicketHash] = useState<string | null>(null);
  const [isLit, setLit] = useState(false);

  useEffect(() => {
    if (ticketHash) {
      getTicketFromApi(ticketHash).then(async (res) => {
        try {
          await storeTicket(res, ticketHash);
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Ticket toegevoegd',
          });
          router.navigate('/more/profile');
        } catch (error) {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Er is een fout opgetreden',
            textBody:
              'Er ging iets fout toen we je ticket probeerden te laden. Probeer het opnieuw.',
          });
          setScanned(false);
          setTicketHash(null);
        }
      });
    }
  }, [ticketHash]);

  const onFlashToggle = React.useCallback(() => {
    setLit((isLit) => !isLit);
  }, []);

  const onCancel = React.useCallback(() => {
    router.back();
  }, []);

  const handleBarCodeScanned = async ({
    data,
  }: {
    data: string;
  }): Promise<void> => {
    setScanned(true);
    const info = await NetInfo.refresh();

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

    if (!info.isConnected) {
      Toast.show(
        {
          type: ALERT_TYPE.WARNING,
          title: 'Geen internet',
          textBody:
            'Je kan je ticket enkel toevoegen als je verbonden bent met het internet.',
          // button: 'Opniew proberen',
          onShow: () => {
            setScanned(false);
          },
        },
        // [
        //   {
        //     text: 'Opnieuw proberen',
        //     onPress: () => {
        //       setScanned(false);
        //     },
        //     style: 'default',
        //   },
        // ],
      );
      return;
    }

    setTicketHash(data);
  };

  return (
    <View style={styles.container}>
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} // Prevents repeated scanning of the same code
        style={StyleSheet.absoluteFillObject}
        enableTorch={isLit}
      />
      <View style={[styles.footer, { bottom: 30 }]}>
        <QRFooterButton
          onPress={onFlashToggle}
          isActive={isLit}
          iconName="flash"
        />
        <QRFooterButton onPress={onCancel} iconName="close" iconSize={48} />
      </View>
      {scanned ? (
        <ActivityIndicator
          animating={true}
          size={128}
          color={Colors.FOSCOLORS.FOS_GREEN}
        />
      ) : (
        <QrIndicator />
      )}
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
