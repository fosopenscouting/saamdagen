import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

type Props = {
  title: string;
  destination: string;
  icon: string;
};

const NavigationListItem: React.FC<Props> = (props: Props) => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const navigate = () => {
    router.push(props.destination);
  };

  return (
    <List.Item
      onPress={navigate}
      title={props.title}
      titleStyle={[styles.text, { color: Colors[colorScheme].text }]}
      contentStyle={styles.item}
      left={() => (
        <List.Icon color={Colors[colorScheme].text} icon={props.icon} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: 'Quicksand_600SemiBold',
  },
});

export default NavigationListItem;
