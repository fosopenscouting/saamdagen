import React from 'react';
import { View, Text, HeaderText } from '../Themed';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import ContentCard from '../ContentCard';

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
      <ContentCard palette="seaGreen" containerStyle={{ marginBottom: 16 }}>
        <HeaderText style={[styles.greetingHeader]}>
          {props.firstName} {props.lastName}
        </HeaderText>

        <Text>Je gaat naar Saamdagen als {props.participantType}.</Text>
        <Text>Tap op de QR-code om ze te vergroten.</Text>
      </ContentCard>

      {props.participantType === 'Deelnemer' ? (
        <ContentCard palette="coral">
          <View style={styles.activityContainer}>
            <HeaderText style={[styles.greetingHeader]}>
              Workshopkeuze
            </HeaderText>
            <Text>
              <Text style={styles.bold}>Voormiddag:</Text> {props.beforeNoon}
            </Text>
            <Text>
              <Text style={styles.bold}>Namiddag:</Text> {props.afterNoon}
            </Text>
          </View>
        </ContentCard>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  greetingHeader: {
    fontSize: 17,
    fontFamily: 'Quicksand_600SemiBold',
  },

  activityHeader: {
    marginTop: 8,
    textDecorationLine: 'underline',
    fontSize: 17,
    marginBottom: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Quicksand_600SemiBold',
  },
  bold: {
    fontWeight: 'bold',
  },
  activityContainer: {
    backgroundColor: 'transparent',
  },
});

export default Profile;
