/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react';
import { View as DefaultView } from 'react-native';
import { Text as DefaultText } from 'react-native-paper';
import DefaultMarkdown from '../Markdown/markdown';
import { Anchor as DefaultAnchor } from '../Anchor';
import { Text } from './Text';
import { ThemeProps, TextProps, useThemeColor } from './Helpers';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { LOCAL_IMAGES } from '@/constants/Images';

export type MarkdownProps = ThemeProps & DefaultMarkdown['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export const HeaderText: React.FC<TextProps> = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    'headerColor',
  ).toString();
  const fontFamily = 'Quicksand_600SemiBold';

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
};

export const Anchor: React.FC<TextProps> = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    'linkColor',
  ).toString();

  return <DefaultAnchor style={[{ color }, style]} {...otherProps} />;
};

export const Markdown: React.FC<MarkdownProps> = (props: MarkdownProps) => {
  const { ...otherProps } = props;

  const renderText = (
    textType: string,
    children: React.ReactElement[],
    key: React.Key | null | undefined,
  ): JSX.Element => {
    // console.log("Rendering markdown text with custom renderer.");
    // Possible textTypes: h1, h2, h3, h4, h5, h6, strong, del, em, u
    switch (textType) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return (
          <HeaderText
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}
            key={key}
          >
            {children}
          </HeaderText>
        );
      case 'strong':
        return (
          <Text
            key={key}
            style={{
              fontFamily: 'Quicksand_600SemiBold',
              fontWeight: 'bold',
              ...(props.markdownStyles?.text ?? null),
            }}
          >
            {children}
          </Text>
        );
      case 'em':
        return (
          <Text
            key={key}
            style={{
              fontStyle: 'italic',
            }}
          >
            {children}
          </Text>
        );
      default:
        return (
          <Text style={props.markdownStyles?.text ?? null} key={key}>
            {children}
          </Text>
        );
    }
  };

  

  const renderImage = (
    src: string,
    alt: string,
    title: string,
    key: string,
  ) => {
    if (src && src.startsWith('@') && LOCAL_IMAGES[src]) {
      return (
        <Image
          key={key}
          source={LOCAL_IMAGES[src]}
          style={{ minWidth: 200, height: 200, flex: 1 }}
        />
      );
    }

    return (
      <Image
        key={key}
        source={{ uri: src }}
        style={{ minWidth: 200, height: 200, flex: 1 }}
      />
    );
  };

  return (
    <DefaultMarkdown
      renderText={renderText}
      renderImage={renderImage}
      {...otherProps}
    />
  );
};

export const View: React.FC<ViewProps> = (props: ViewProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  ).toString();

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
      lightColor={Colors.light.tabBarStyle.backgroundColor}
      darkColor="rgb(255,255,255)"
    />
  );
};
