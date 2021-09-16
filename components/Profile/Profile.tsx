import React from 'react';
import { View, Text, HeaderText } from '../Themed';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

interface ProfileProps {
  firstName: string;
  lastName: string;
  participantType: string;
  beforeNoon: string;
  afterNoon: string;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {

  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].cardBackground },
      ]}
    >
      <HeaderText style={[styles.greetingHeader]}>
        Hey {props.firstName}
      </HeaderText>
      <Text style={styles.ticketText}>Dit is jouw ticket voor Saamdagen.</Text>
      <Text style={styles.ticketText}>
        Met deze QR-code krijg je toegang tot het evenement.
      </Text>
      <Text style={styles.ticketType}>
        Je bent op Saamdagen als {props.participantType}.
      </Text>
      {props.participantType === 'Deelnemer' ? (
        <View style={styles.activityContainer}>
          <HeaderText style={[styles.activityHeader]}>Workshopkeuze</HeaderText>
          <Text>
            <Text style={styles.bold}>Voormiddag:</Text> {props.beforeNoon}
          </Text>
          <Text>
            <Text style={styles.bold}>Namiddag:</Text> {props.afterNoon}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  greetingHeader: {
    fontSize: 17,
    fontFamily: 'AndesBold',
  },
  ticketText: {
    textAlign: 'center',
  },
  ticketType: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  activityHeader: {
    marginTop: 8,
    textDecorationLine: 'underline',
    fontSize: 17,
    marginBottom: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'AndesBold',
  },
  bold: {
    fontWeight: 'bold',
  },
  activityContainer: {
    backgroundColor: 'transparent',
  },
});

export default Profile;
