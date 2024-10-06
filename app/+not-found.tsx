import { Text } from '@/components/Themed/Text';
import { HeaderText } from '@/components/Themed/Themed';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const NotFoundScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderText variant='displayLarge' style={styles.header}>Ola! Wa is da hier?</HeaderText>
      <Text style={styles.title}>
        De pagina waar je naartoe wou gaan is niet gevonden...
      </Text>
      <TouchableOpacity onPress={() => router.replace('/')} style={styles.link}>
        <Text variant='titleLarge' style={styles.linkText}>Terug naar start!</Text>
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
    marginBottom: 50,
    color: '#fff',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    // fontSize: 14,
    color: Colors.FOSCOLORS.FOS_GREEN,
  },
});
