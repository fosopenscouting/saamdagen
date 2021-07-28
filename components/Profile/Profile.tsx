import React from 'react';
import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

interface ProfileProps {
  firstName: string;
  lastName: string;
  participantType: string;
  beforeNoon: string;
  afterNoon: string;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greetingHeader}>Hey {props.firstName}</Text>
      <Text style={styles.ticketText}>Dit is jouw ticket voor Saamdagen.</Text>
      <Text style={styles.ticketText}>
        Met deze QR-code krijg je toegang tot het evenement.
      </Text>
      <Text style={styles.ticketType}>
        Je bent op Saamdagen als {props.participantType}
      </Text>
      {props.participantType === 'Deelnemer' ? (
        <>
          <Text style={styles.activityHeader}>Workshopkeuze</Text>
          <Text>
            <Text style={styles.bold}>Voormiddag:</Text> {props.beforeNoon}
          </Text>
          <Text>
            <Text style={styles.bold}>Namiddag:</Text> {props.afterNoon}
          </Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  greetingHeader: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  ticketText: {
    textAlign: 'center',
  },
  ticketType: {
    marginTop: 16,
    marginBottom: 8,
  },
  activityHeader: {
    marginTop: 8,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 17,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Profile;
