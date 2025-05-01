import React from 'react';
import { HeaderText, View } from '@/components/Themed/Themed';
import {
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import NoProfile from '@/components/Profile/NoProfile';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ticket } from '@/models/Ticket';
import SvgQRCode from 'react-native-qrcode-svg';
import Colors from '@/constants/Colors';
import Profile from '@/components/Profile/Profile';
import * as Brightness from 'expo-brightness';
import {
  getTicketFromApi,
  getTicketFromStorage,
  storeTicket,
} from '@/services/ticketService';
import Loading from '@/components/Loading';
import {  Icon } from 'react-native-paper';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { setStatusBarHidden } from 'expo-status-bar';
import { useAlerts } from 'react-native-paper-alerts';
import { useToast } from 'react-native-paper-toast';
import { Text } from '@/components/Themed/Text';

const ProfileScreen: React.FC = () => {
  const alerts = useAlerts();
  const toaster = useToast();

  const [ticketData, setTicketData] = useState<Ticket | null>();
  const [modalVisible, setModalVisible] = useState(false);
  const [initialBrightness, setInitialBrightness] = useState<number>(0);
  const [ticketLoading, setTicketLoading] = useState<boolean>(false);
  const { hash } = useLocalSearchParams<{ hash: string }>();

  useEffect(() => {
    (async () => {
      const brightness = await Brightness.getSystemBrightnessAsync();
      setInitialBrightness(brightness);
    })();
  }, []);

  useEffect(() => {
    if (hash) {
      setTicketLoading(true);
      getTicketFromApi(hash).then(async (res) => {
        try {
          const ticket = await storeTicket(res, hash);
          if (ticket) setTicketData(ticket);
          setTicketLoading(false);
        } catch (error) {
          toaster.show({
            position: 'top',
            type: 'error',
            message:
              'Er ging iets fout toen we je ticket probeerden te laden. Probeer het opnieuw.',
          });
          setTicketLoading(false);
        }
      });
    }
  }, []);

  useFocusEffect(() => {
    setTicketLoading(true);
    getTicketFromStorage().then((res) => {
      setTicketData(res);
    });
    setTicketLoading(false);
  });

  useEffect(() => {
    (async () => {
      if (modalVisible) {
        const brightness = await Brightness.getBrightnessAsync();
        setInitialBrightness(brightness);
        Brightness.setBrightnessAsync(1);
      }
    })();
  }, [modalVisible]);

  const resetModal = () => {
    setModalVisible(false);
    setStatusBarHidden(false, 'slide');
    (async () => {
      Brightness.restoreSystemBrightnessAsync();
      if (Platform.OS == 'ios')
        Brightness.setBrightnessAsync(initialBrightness);
    })();
  };

  const showConfirmDialog = () => {
    alerts.alert(
      'Ben je zeker?',
      'Ben je zeker dat je je ticket wilt verwijderen?',
      [
        {
          text: 'Sluiten',
          style: 'cancel',
        },
        {
          text: 'Verwijderen',
          onPress() {
            deleteTicket();
          },
        },
      ],
    );
  };

  const deleteTicket = async () => {
    await AsyncStorage.removeItem('sd_ticket');
    setTicketData(null);
  };

  const handleQrPress = () => {
    setModalVisible(!modalVisible);

    setStatusBarHidden(true, 'slide');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View
        style={styles.container}
        lightColor={Colors.light.background}
        darkColor={Colors.dark.background}
      >
        <Loading loading={ticketLoading}>
          {ticketData ? (
            <View style={styles.profileContainer}>
              <Modal
                presentationStyle="fullScreen"
                animationType="slide"
                visible={modalVisible}
                onRequestClose={resetModal}
              >
                <TouchableOpacity
                  style={styles.container}
                  activeOpacity={1}
                  onPressOut={resetModal}
                >
                  <View style={[styles.qrModal, styles.qrContainer]}>
                    <Icon
                      color={Colors.FOSCOLORS.FOS_BLUE}
                      source="ticket-confirmation"
                      size={64}
                      
                    />
                    <HeaderText
                      variant="displaySmall"
                      style={{
                        color: Colors.FOSCOLORS.FOS_BLUE,
                        marginBottom: 32,
                      }}
                    >
                      Mijn ticket
                    </HeaderText>
                    <SvgQRCode size={300} value={ticketData.hash} />
                    <Text variant='bodySmall' style={{
                      marginTop: 5,
                      color: "#ccc"
                    }}>Klik om af te sluiten</Text>
                  </View>
                </TouchableOpacity>
              </Modal>

              <Profile
                firstName={ticketData.firstName}
                lastName={ticketData.lastName}
                beforeNoon={ticketData.workshopBeforeNoon}
                participantType={ticketData.ticketType}
                onDeleteTicketPress={showConfirmDialog}
              >
                <Pressable onPress={handleQrPress}>
                  <View style={styles.qrContainer}>
                    <SvgQRCode size={130} value={ticketData.hash} />
                  </View>
                </Pressable>
              </Profile>
            </View>
          ) : (
            <View style={styles.profileContainer}>
              <NoProfile />
            </View>
          )}
        </Loading>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 1,
    width: '100%',
  },
  qrContainer: {
    backgroundColor: Colors.light.white,
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  qrModal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
