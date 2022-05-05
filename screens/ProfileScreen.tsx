import React from 'react';
import { Separator, View } from '../components/Themed';
import { StyleSheet, Button, ScrollView, Alert } from 'react-native';
import NoProfile from '../components/Profile/NoProfile';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ticket } from '../models/Ticket';
import SvgQRCode from 'react-native-qrcode-svg';
import Colors from '../constants/Colors';
import Profile from '../components/Profile/Profile';

const ProfileScreen: React.FC = () => {
  const [ticketData, setTicketData] = useState<Ticket | null>();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTicket();
    });

    return unsubscribe;
  }, []);

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

  const getTicket = async () => {
    const ticket = await AsyncStorage.getItem('sd_ticket');

    if (ticket) {
      setTicketData(JSON.parse(ticket));
    }
  };

  const deleteTicket = async () => {
    await AsyncStorage.removeItem('sd_ticket');
    setTicketData(null);
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
            <View style={styles.qrContainer}>
              <SvgQRCode size={130} value={ticketData.hash} />
            </View>
            <Separator />
            <Profile
              firstName={ticketData.firstName}
              lastName={ticketData.lastName}
              beforeNoon={
                ticketData.activityBeforeNoon
                  ? ticketData.activityBeforeNoon
                  : ticketData.workshopBeforeNoon
              }
              afterNoon={
                ticketData.activityAfterNoon
                  ? ticketData.activityAfterNoon
                  : ticketData.workshopAfterNoon
              }
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
    padding: 24,
    alignItems: 'center',
    borderRadius: 8,
  },
  separator: {
    marginVertical: 24,
    height: 1,
    width: '100%',
  },
});

export default ProfileScreen;
