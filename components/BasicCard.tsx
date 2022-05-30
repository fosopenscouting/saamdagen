import React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ContentCard, { ThemeIdentifier, themes } from './ContentCard';
import ContentCardTitle from './ContentCardTitle';
import { Text } from './Themed';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

const getTextColor = (
  colorScheme: 'light' | 'dark',
  palette: ThemeIdentifier,
  mode: 'outlined' | 'elevated' | undefined,
) => {
  // Item is filled
  if (mode === 'elevated') {
    return themes[palette].textColor;
  }
  if (mode === 'outlined') {
    return Colors[colorScheme].text;
  }
};

type Props = {
  title: string;
  content: string;
  mode: 'elevated' | 'outlined';
  palette: ThemeIdentifier;
  containerStyle?: StyleProp<ViewStyle>;
};

const BasicCard: React.FC<Props> = (props: Props) => {
  const colorScheme = useColorScheme();
  const textColor = getTextColor(colorScheme, props.palette, props.mode);

  return (
    <ContentCard
      containerStyle={props.containerStyle}
      mode={props.mode}
      palette={props.palette}
    >
      <Text style={[{ color: textColor }, styles.title]}>{props.title}</Text>
      <Text style={[{ color: textColor }]}>{props.content}</Text>
    </ContentCard>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default BasicCard;
