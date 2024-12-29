import React, { ReactElement } from 'react';
import { View, HeaderText, Separator } from '@/components/Themed/Themed';
import { Text } from '@/components/Themed/Text';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface ProfileProps {
  firstName: string;
  lastName: string;
  participantType: string;
  beforeNoon: string;
  children: ReactElement;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  return (
    <>
      <View style={styles.introContainer}>
        <HeaderText lightColor="#fff" variant="headlineLarge">
          Hey {props.firstName}
        </HeaderText>
        <Text lightColor="#fff" variant="titleLarge">
          Ben jij al klaar voor Saamdagen? Wij alvast wel!
        </Text>
        <Text lightColor="#fff" variant="titleMedium">
          Hieronder vind je je ticket terug en ook welke workshop je gekozen
          hebt.
        </Text>
      </View>

      <Separator marginVertical={0} />

      <View style={styles.headerContainer}>
        <View style={styles.profileInfo}>
          <HeaderText
            style={styles.profileInfoName}
            lightColor="#fff"
            variant="headlineMedium"
          >
            {props.firstName} {props.lastName}
          </HeaderText>
          <Text lightColor="#fff" variant="titleMedium">
            {props.participantType}
          </Text>
          <Text lightColor="#fff" variant="bodySmall">
            Klik op de QR-code om ze te vergroten
          </Text>
        </View>
        {props.children}
      </View>

      {props.participantType === 'Deelnemer' ? (
        <>
          <Separator marginVertical={0} />

          <View style={styles.workshopContainer}>
            <HeaderText lightColor="#fff" variant="headlineLarge">
              Workshopkeuze
            </HeaderText>
            <Text lightColor="#fff" variant="titleMedium">
              {props.firstName}, jij hebt voor de volgende workshop gekozen:
            </Text>
            <HeaderText variant="titleMedium">{props.beforeNoon}</HeaderText>
          </View>
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  introContainer: {
    padding: 16,
    paddingVertical: 25,
    backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.FOSCOLORS.SEA_GREEN,
    gap: 5,
    padding: 16,
    paddingVertical: 50,
  },
  profileInfo: {
    flexGrow: 1,
    maxWidth: '55%',
    backgroundColor: Colors.FOSCOLORS.SEA_GREEN,
  },
  profileInfoName: {
    marginBottom: 5,
  },
  workshopContainer: {
    padding: 16,
    paddingVertical: 50,
    backgroundColor: Colors.FOSCOLORS.CORAL,
  }
});

export default Profile;
