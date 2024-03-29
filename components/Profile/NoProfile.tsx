import React from 'react';
import { View, Separator, HeaderText } from '../Themed/Themed';
import { Text } from '../Themed/Text';
import { Button, StyleSheet } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import requestCameraPermissionsAsync from '../../utils/requestCameraPermissionsAsync';

const NoProfile: React.FC = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handleScanPress = async () => {
    if (await requestCameraPermissionsAsync()) {
      navigation.navigate('ScanScreen');
    } else {
      // TODO: replace with better alert
      alert(
        'Om je ticket te kunnen scannen, moet je toegang geven tot je camera. Geef toegang tot je camera via de instellingen van je apparaat',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Separator />
      <HeaderText style={styles.title}>
        Naar welke workshop of activiteit ga jij?
      </HeaderText>
      <Text style={styles.text}>
        Scan jouw ticket om je workshops en activiteiten hier te zien. Doe dit
        op voorhand: je hebt een werkende internetconnectie nodig.
      </Text>
      <Separator />
      <Button
        color={Colors[colorScheme].tabBackground}
        title="Ticket scannen"
        onPress={handleScanPress}
      />
    </View>
  );
};

export default NoProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Quicksand_600SemiBold',
    textAlign: 'center',
  },
});
