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
  children: React.ReactNode;
  palette: ThemeIdentifier;
  mode?: 'elevated' | 'outlined';
  containerStyle?: StyleProp<ViewStyle>;
  backgroundImage?: ImageSourcePropType;
  colorOverlay?: boolean;
};

export type ThemeIdentifier =
  | 'warmRed'
  | 'seaGreen'
  | 'coral'
  | 'brightPink'
  | 'brightYellow'
  | 'fosBlue';

type CardTheme = {
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
};

export const themes: { [key in ThemeIdentifier]: CardTheme } = {
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
  fosBlue: {
    backgroundColor: Colors.schemeIndependent.fosBlue,
    textColor: 'white',
  },
};

const ContentCard: React.FC<Props> = (props: Props) => {
  const overlayStyle = props.colorOverlay ? { opacity: 0.6 } : null;
  const borderStyle =
    props.mode == 'outlined'
      ? [{ borderColor: themes[props.palette].backgroundColor }, styles.border]
      : [
          {
            backgroundColor: themes[props.palette].backgroundColor,
          },
        ];

  return (
    <View
      style={[
        borderStyle,
        props.containerStyle,
        styles.borderRadius,
        styles.shadow,
      ]}
    >
      {props.backgroundImage ? (
        <ImageBackground
          resizeMode="cover"
          imageStyle={[overlayStyle, styles.borderRadius]}
          style={[styles.image]}
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'stretch',
  },
  border: {
    borderWidth: 2,
  },
  borderRadius: {
    borderRadius: 8,
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
