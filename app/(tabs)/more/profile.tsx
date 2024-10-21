import React from 'react';
import { Separator, View } from '@/components/Themed/Themed';
import {
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
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
import { Button } from 'react-native-paper';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const ProfileScreen: React.FC = () => {
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
          setTicketData(ticket);
          setTicketLoading(false);
        } catch (error) {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Er is een fout opgetreden',
            textBody: 'Er ging iets fout toen we je ticket probeerden te laden. Probeer het opnieuw.',
          })
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
    (async () => {
      Brightness.setBrightnessAsync(initialBrightness);
    })();
  };

  const showConfirmDialog = () => {
    return Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Ben je zeker?',
      textBody: 'Ben je zeker dat je je ticket wilt verwijderen?\nKlik buiten deze melding als je je ticket wilt behouden.',
      button: 'Verwijderen',
      onPressButton: () => {
        deleteTicket()
      }
    })
  };

  const deleteTicket = async () => {
    await AsyncStorage.removeItem('sd_ticket');
    setTicketData(null);
    Dialog.hide();
  };

  const handleQrPress = () => {
    setModalVisible(!modalVisible);
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
                    <SvgQRCode size={300} value={ticketData.hash} />
                  </View>
                </TouchableOpacity>
              </Modal>

              <Profile
                firstName={ticketData.firstName}
                lastName={ticketData.lastName}
                beforeNoon={ticketData.workshopBeforeNoon}
                participantType={ticketData.ticketType}
              >
                <Pressable onPress={handleQrPress}>
                  <View style={styles.qrContainer}>
                    <SvgQRCode size={130} value={ticketData.hash} />
                  </View>
                </Pressable>
              </Profile>

              <Separator marginVertical={0} />

              <Button
                mode="contained"
                buttonColor={Colors.FOSCOLORS.WARMRED}
                textColor="white"
                icon="delete"
                style={{
                  margin: 16,
                }}
                onPress={showConfirmDialog}
              >
                Ticket verwijderen
              </Button>
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
  separator: {
    marginVertical: 24,
    height: 1,
    width: '100%',
  },
});

export default ProfileScreen;
