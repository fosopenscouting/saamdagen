import React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ContentCard, { ThemeIdentifier, themes } from './ContentCard';
import ContentCardTitle from './ContentCardTitle';
import { Text } from './Themed';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Markdown from 'react-native-easy-markdown';

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
      <Markdown>
        {
          '# Why is markdown cool?\n\n' +

          '* because it lets us do simple formatting **easily** \n' +
          '* _without_ the need for complex CMS data structures \n' +
          '* and you can outsource ~~your~~ work to the content creators! \n\n' +
  
          '> This is a blockquote \n\n' +
  
          '![We can add images!](http://placehold.it/300x300) \n' +
          '[Or link to places](http://foobar.com) \n'
        }
      </Markdown>
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
