import { Text } from '@/components/Themed/Text';
import { HeaderText } from '@/components/Themed/Themed';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const NotFoundScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderText variant="displayMedium" style={styles.header}>
        Elaba! {'\n'}
        Wa doet gij hier?
      </HeaderText>
      <Text style={styles.title}>
        De pagina die je zocht is niet gevonden. {'\n'}
        Weer iets aan het uitspoken zeker?
      </Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.link}>
        <Text variant="titleLarge" style={styles.linkText}>
          Alee, terug dan maar?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  header: {
    textAlign: 'center',
    marginStart: 0,
    marginBottom: 50,
    color: '#fff',
    width: '100%',
  },
  link: {
    marginTop: 15,
    borderRadius: 24,
  },
  linkText: {
    padding: 15,
    fontFamily: 'Quicksand_500Medium',
    color: Colors.FOSCOLORS.FOS_GREEN,
  },
});
