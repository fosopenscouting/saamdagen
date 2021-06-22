import React from 'react';
import { View, Text } from '../Themed';
import { Button, StyleSheet } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const NoProfile: React.FC = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Naar welke workshop of activiteit ga jij?
      </Text>
      <Text style={styles.text}>
        Scan jouw ticket om je workshops en activiteiten hier te zien. Doe dit
        op voorhand: je hebt een werkende internetconnectie nodig.
      </Text>
      <Button
        color={Colors[colorScheme].tabBackground}
        title="Ticket scannen"
        onPress={() => navigation.navigate('ScanScreen')}
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
  },
  text: {
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
