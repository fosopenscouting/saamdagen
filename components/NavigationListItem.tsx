import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

type Props = {
  title: string;
  destination: string;
  icon: string;
};

const NavigationListItem: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const navigate = () => {
    navigation.navigate(props.destination);
  };

  return (
    <List.Item
      onPress={navigate}
      title={props.title}
      titleStyle={[styles.text, { color: Colors[colorScheme].text }]}
      left={() => (
        <List.Icon color={Colors[colorScheme].text} icon={props.icon} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default NavigationListItem;
