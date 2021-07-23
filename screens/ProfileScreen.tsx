import React from 'react';
import { Text, View } from '../components/Themed';
import { StyleSheet, Button, ScrollView } from 'react-native';
import NoProfile from '../components/Profile/NoProfile';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ticket } from '../models/Ticket';
import SvgQRCode from 'react-native-qrcode-svg';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const ProfileScreen: React.FC = () => {
  const [ticketData, setTicketData] = useState<Ticket | null>();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTicket();
    });

    return unsubscribe;
  }, []);

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
      <View style={styles.container}>
        {ticketData ? (
          <View style={styles.profileContainer}>
            <View style={styles.qrContainer}>
              <SvgQRCode size={170} value={ticketData.hash} />
            </View>

            <Text style={styles.qrInfo}>
              Je kan deze QR code ook gebruiken bij de check-in
            </Text>

            <View style={styles.profileText}>
              <View style={styles.infoBlock}>
                <Text>Ticket van</Text>
                <Text style={styles.ticketText}>
                  {ticketData.firstName} {ticketData.lastName}
                </Text>
              </View>
              <View style={styles.infoBlock}>
                <Text>Je bent op Saamdagen als</Text>
                <Text style={styles.ticketText}>{ticketData.ticketType}</Text>
              </View>
            </View>

            {ticketData.ticketType == 'Deelnemer' ? (
              <View style={styles.profileText}>
                <View style={styles.infoBlock}>
                  <Text>Voormiddag</Text>
                  <Text style={styles.ticketText}>
                    {ticketData.activityBeforeNoon}
                    {ticketData.workshopBeforeNoon}
                  </Text>
                </View>

                <Text>Namiddag</Text>
                <Text style={styles.ticketText}>
                  {ticketData.activityAfterNoon}
                  {ticketData.workshopAfterNoon}
                </Text>
              </View>
            ) : null}
            <View style={styles.deleteContainer}>
              <Button
                color="#EB5961"
                onPress={deleteTicket}
                title="Verwijder"
              />
            </View>
          </View>
        ) : (
          <NoProfile />
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
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  qrContainer: {
    backgroundColor: Colors.light.white,
    padding: 24,
    alignItems: 'center',
    borderRadius: 8,
  },
  qrInfo: {
    justifyContent: 'center',
    color: 'grey',
    marginTop: 4,
    fontSize: 11,
  },
  profileText: {
    marginTop: 12,
    backgroundColor: '#82CEB9',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  infoBlock: {
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  ticketText: {
    fontSize: 16,
  },
  deleteContainer: {
    marginTop: 8,
  },
});

export default ProfileScreen;
