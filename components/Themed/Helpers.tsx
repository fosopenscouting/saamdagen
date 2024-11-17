import useColorScheme from '@/hooks/useColorScheme';
import { Text as DefaultText } from 'react-native-paper';
import Colors from '@/constants/Colors';
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

export type TextProps = ThemeProps & React.ComponentProps<typeof DefaultText>;

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};
