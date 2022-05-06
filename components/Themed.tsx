/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';
import { Anchor as DefaultAnchor } from '../components/Anchor';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const useThemeColor = (
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

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export const HeaderText: React.FC<TextProps> = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    'headerColor',
  );
  const fontFamily = 'Andes';

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
};

export const Anchor: React.FC<TextProps> = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    'linkColor',
  );

  return <DefaultAnchor style={[{ color }, style]} {...otherProps} />;
};

export const Text: React.FC<TextProps> = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const fontFamily = 'Quicksand_300Light';
  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
};

export const View: React.FC<ViewProps> = (props: ViewProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

type SeparatorProps = {
  marginVertical?: number;
};

export const Separator: React.FC<SeparatorProps> = (props: SeparatorProps) => {
  const realMarginVertical = props.marginVertical ?? 24;
  return (
    <View
      style={{ marginVertical: realMarginVertical, height: 1, width: '100%' }}
      lightColor={Colors.light.tabBackground}
      darkColor="rgb(255,255,255)"
    />
  );
};
