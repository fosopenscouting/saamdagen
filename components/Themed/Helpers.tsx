import useColorScheme from '../../hooks/useColorScheme';
import { Text as DefaultText } from 'react-native';
import Colors from '../../constants/Colors';

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

export type TextProps = ThemeProps & DefaultText['props'];

export type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
  };