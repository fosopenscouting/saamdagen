import React from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { ImageBackground, ImageSource } from "expo-image";
import Colors from '../constants/Colors';
import { View } from './Themed/Themed';

type Props = {
  children: React.ReactNode;
  palette: ThemeIdentifier;
  mode?: 'elevated' | 'outlined';
  containerStyle?: StyleProp<ViewStyle>;
  backgroundImage?: ImageSource;
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
    backgroundColor: Colors.FOSCOLORS.WARMRED,
    textColor: 'white',
  },
  seaGreen: {
    backgroundColor: Colors.FOSCOLORS.SEA_GREEN,
    textColor: 'white',
  },
  coral: {
    backgroundColor: Colors.FOSCOLORS.CORAL,
    textColor: 'white',
  },
  brightPink: {
    backgroundColor: Colors.FOSCOLORS.BRIGHTPINK,
    textColor: 'white',
  },
  brightYellow: {
    backgroundColor: Colors.FOSCOLORS.BRIGHTYELLOW,
    textColor: 'white',
  },
  fosBlue: {
    backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
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
