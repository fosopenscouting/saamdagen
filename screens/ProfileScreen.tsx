import React from 'react';
import { Separator, View } from '../components/Themed';
import {
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import NoProfile from '../components/Profile/NoProfile';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ticket } from '../models/Ticket';
import SvgQRCode from 'react-native-qrcode-svg';
import Colors from '../constants/Colors';
import Profile from '../components/Profile/Profile';
import * as Brightness from 'expo-brightness';
import {
  getTicketFromApi,
  getTicketFromStorage,
  storeTicket,
} from '../services/TicketService';

const ProfileScreen: React.FC = () => {
  const [ticketData, setTicketData] = useState<Ticket | null>();
  const [modalVisible, setModalVisible] = useState(false);
  const [initialBrightness, setInitialBrightness] = useState<number>(0);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const brightness = await Brightness.getSystemBrightnessAsync();
      setInitialBrightness(brightness);
    })();
  }, []);

  useEffect(() => {
    const state = navigation.getState();
    const hash = state.routes[0]?.params?.hash;
    if (hash) {
      getTicketFromApi(hash).then(async (res) => {
        await storeTicket(res, hash);
      });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTicketFromStorage().then((res) => {
        setTicketData(res);
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        if (modalVisible) {
          Brightness.setSystemBrightnessAsync(1);
        }
      }
    })();
  }, [modalVisible]);

  const resetModal = () => {
    setModalVisible(false);
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(initialBrightness);
      }
    })();
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      'Ben je zeker',
      'Ben je zeker dat je je ticket wil verwijderen?',
      [
        {
          text: 'Ja',
          onPress: () => {
            deleteTicket();
          },
        },
        {
          text: 'Nee',
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
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View
        style={styles.container}
        lightColor={Colors.light.background}
        darkColor={Colors.dark.background}
      >
        {ticketData ? (
          <View style={styles.profileContainer}>
            <Modal
              presentationStyle="fullScreen"
              animationType="slide"
              visible={modalVisible}
              onRequestClose={resetModal}
            >
              <View style={[styles.qrModal, styles.qrContainer]}>
                <SvgQRCode size={300} value={ticketData.hash} />
              </View>
            </Modal>
            <Pressable onPress={handleQrPress}>
              <View style={styles.qrContainer}>
                <SvgQRCode size={130} value={ticketData.hash} />
              </View>
            </Pressable>

            <Separator />
            <Profile
              firstName={ticketData.firstName}
              lastName={ticketData.lastName}
              beforeNoon={ticketData.workshopBeforeNoon}
              participantType={ticketData.ticketType}
            />
            <Separator />

            <Button
              color="#EB5961"
              onPress={showConfirmDialog}
              title="Verwijder"
            />
          </View>
        ) : (
          <View style={styles.profileContainer}>
            <NoProfile />
          </View>
        )}
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
    marginTop: 32,
    marginBottom: 32,
    alignItems: 'center',
    width: '80%',
  },
  qrContainer: {
    backgroundColor: Colors.light.white,
    padding: 48,
    alignItems: 'center',
    borderRadius: 8,
  },
  qrModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  separator: {
    marginVertical: 24,
    height: 1,
    width: '100%',
  },
});

export default ProfileScreen;
