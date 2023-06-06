import React from 'react';
import { Text } from './Themed/Themed';
import { ThemeIdentifier, themes } from './ContentCard';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { StyleProp, TextStyle } from 'react-native';

type Props = {
  title: string;
  mode: 'elevated' | 'outlined';
  palette: ThemeIdentifier;
};

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

const ContentCardTitle: React.FC<Props> = (props: Props) => {
  const { mode, palette } = props;
  const colorScheme = useColorScheme();

  const textStyle: StyleProp<TextStyle> = {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: getTextColor(colorScheme, palette, mode),
  };

  return <Text style={textStyle}>{props.title}</Text>;
};

export default ContentCardTitle;
