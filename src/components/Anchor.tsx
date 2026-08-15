import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
} from 'react-native';
import * as Linking from 'expo-linking';
import React from 'react';

export type Props = {
  href?: string;
  children?: React.ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<TextStyle>[];
};

export const Anchor: React.FC<Props> = (props: Props) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (props.href) {
      Linking.openURL(props.href);
      if (props.onPress) props.onPress(event);
    }
  };

  return (
    <Text {...props} onPress={handlePress}>
      {props.children}
    </Text>
  );
};
