import React from 'react';
import { View, HeaderText } from '../Themed/Themed';
import { Text } from '../Themed/Text';
import { StyleSheet } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import ContentCard from '../ContentCard';

interface ProfileProps {
  firstName: string;
  lastName: string;
  participantType: string;
  beforeNoon: string;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container]}>
      <ContentCard palette="seaGreen" containerStyle={{ marginBottom: 16 }}>
        <HeaderText lightColor="white" style={[styles.greetingHeader]}>
          {props.firstName} {props.lastName}
        </HeaderText>

        <Text lightColor="white" darkColor="white">
          Je gaat naar Saamdagen als {props.participantType}.
        </Text>
        <Text lightColor="white" darkColor="white">
          Tap op de QR-code om ze te vergroten.
        </Text>
      </ContentCard>

      {props.participantType === 'Deelnemer' ? (
        <ContentCard palette="coral">
          <View style={styles.activityContainer}>
            <HeaderText lightColor="white" style={[styles.greetingHeader]}>
              Workshopkeuze
            </HeaderText>
            <Text lightColor="white" darkColor="white">
              {props.beforeNoon}
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
