import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper';
import merge from 'deepmerge';
import { darkTheme, lightTheme } from '@/constants/PaperTheme';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(PaperDefaultTheme, LightTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, DarkTheme);

const quicksandFont = {
  300: {
    fontFamily: 'Quicksand_300Light',
  },
  400: {
    fontFamily: 'Quicksand_400Regular',
  },
  500: {
    fontFamily: 'Quicksand_500Medium',
  },
  600: {
    fontFamily: 'Quicksand_600SemiBold',
  },
  700: {
    fontFamily: 'Quicksand_700Bold',
  },
};

const fontConfig = {
  displaySmall: { ...quicksandFont[400] },
  displayMedium: { ...quicksandFont[400] },
  displayLarge: { ...quicksandFont[400] },

  headlineSmall: { ...quicksandFont[400] },
  headlineMedium: { ...quicksandFont[400] },
  headlineLarge: { ...quicksandFont[400] },

  titleSmall: { ...quicksandFont[500] },
  titleMedium: { ...quicksandFont[500] },
  titleLarge: { ...quicksandFont[400] },

  labelSmall: { ...quicksandFont[500] },
  labelMedium: { ...quicksandFont[500] },
  labelLarge: { ...quicksandFont[500] },

  bodySmall: { ...quicksandFont[400] },
  bodyMedium: { ...quicksandFont[400] },
  bodyLarge: { ...quicksandFont[400] },

  default: { ...quicksandFont[400] },
};

export const CustomDarkTheme = {
  ...CombinedDarkTheme,
  mode: 'exact',
  colors: darkTheme.colors,
  fonts: configureFonts({
    config: fontConfig,
  }),
};

export const CustomDefaultTheme = {
  ...CombinedDefaultTheme,
  colors: lightTheme.colors,
  fonts: configureFonts({
    config: fontConfig,
  }),
};
