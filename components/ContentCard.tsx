import { Theme } from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { Card } from 'react-native-paper';
import Colors from '../constants/Colors';
import { View } from './Themed';

type Props = {
  title: string;
  children: React.ReactNode;
  palette: ThemeIdentifier;
  mode?: 'elevated' | 'outlined';
  containerStyle?: StyleProp<ViewStyle>;
  backgroundImage?: ImageSourcePropType;
};

type ThemeIdentifier =
  | 'warmRed'
  | 'seaGreen'
  | 'coral'
  | 'brightPink'
  | 'brightYellow';

type CardTheme = {
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
};

const themes: { [key in ThemeIdentifier]: CardTheme } = {
  warmRed: {
    backgroundColor: Colors.schemeIndependent.warmRed,
    textColor: 'white',
  },
  seaGreen: {
    backgroundColor: Colors.schemeIndependent.seaGreen,
    textColor: 'white',
  },
  coral: {
    backgroundColor: Colors.schemeIndependent.coral,
    textColor: 'white',
  },
  brightPink: {
    backgroundColor: Colors.schemeIndependent.brightPink,
    textColor: 'white',
  },
  brightYellow: {
    backgroundColor: Colors.schemeIndependent.brightYellow,
    textColor: 'white',
  },
};

const ContentCard: React.FC<Props> = (props: Props) => {
  const borderStyle =
    props.mode == 'outlined'
      ? [{ borderColor: themes[props.palette].backgroundColor }, styles.border]
      : [
          {
            backgroundColor: themes[props.palette].backgroundColor,
          },
        ];

  return (
    <View style={[borderStyle, props.containerStyle]}>
      {props.backgroundImage ? (
        <ImageBackground
          resizeMode="cover"
          style={styles.image}
          source={props.backgroundImage}
        >
          <View style={styles.container}>{props.children}</View>
        </ImageBackground>
      ) : (
        <View style={styles.container}>{props.children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    borderWidth: 2,
  },
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  image: {
    width: '100%',
    justifyContent: 'center',
  },
});

export default ContentCard;
