import React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ContentCard, { ThemeIdentifier, themes } from './ContentCard';
import { HeaderText, Markdown } from './Themed/Themed';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { IProps } from 'react-native-easy-markdown';
// import Markdown from './Markdown/markdown';

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
      <HeaderText style={[{ color: textColor }, styles.title]}>
        {props.title}
      </HeaderText>
      <Markdown markdownStyles={{ text: { color: textColor } }}>
        {props.content}
      </Markdown>
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
