import useColorScheme from '../../hooks/useColorScheme';
import { Text as DefaultText } from 'react-native-paper';
import Colors from '../../constants/Colors';
import React from 'react';

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) => {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
};

<<<<<<< HEAD
export type TextProps = ThemeProps & React.ComponentProps< typeof DefaultText >;
=======
export type TextProps = ThemeProps & React.ComponentProps<typeof DefaultText>;
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};
