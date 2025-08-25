import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  newArchEnabled: true,
  name: 'Saamdagen',
  slug: 'saamdagen',
  version: '#{APP_VERSION}#',
  owner: 'fos-open-scouting',
  orientation: 'portrait',
  icon: './assets/images/logo.png',
  scheme: 'saamdagen',
  userInterfaceStyle: 'automatic',
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/7830594e-890b-4c9e-89cf-b91bf1926f72',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    buildNumber: '7',
    supportsTablet: true,
    bundleIdentifier: 'be.fos.saamdagen',
    infoPlist: {
      NSCameraUsageDescription:
        'Je camera wordt gebruikt om je ticket te scannen en zo persoonlijke info te krijgen zoals bijvoorbeeld de workshops waarvoor je bent ingeschreven.',
      UIBackgroundModes: ['fetch'],
    },
    icon: {
      dark: './assets/images/icon/ios_dark.png',
      tinted: './assets/images/icon/ios_tinted.png',
    },
  },
  android: {
    package: 'be.fos.saamdagen',
    adaptiveIcon: {
      foregroundImage: './assets/images/icon/adaptive-icon.png',
      backgroundImage: './assets/images/icon/adaptive-icon-bg.png',
      monochromeImage: './assets/images/icon/monochrome.png',
    },
    permissions: ['CAMERA'],
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
  },
  web: {
    favicon: './assets/images/favicon.png',
  },
  description: '',
  plugins: [
    [
      'expo-splash-screen',
      {
        backgroundColor: '#00549F',
        image: './assets/images/logo.png',
        imageWidth: 200,
      },
    ],
    'expo-asset',
    'expo-font',
    'expo-router',
    [
      'expo-notifications',
      {
        icon: './assets/images/icon/notification.png',
        color: '#00549F',
      },
    ],
    [
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        project: 'saamdagen-app',
        organization: 'fosopenscouting',
      },
    ],
  ],
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  extra: {
    eas: {
      projectId: '7830594e-890b-4c9e-89cf-b91bf1926f72',
    },
  },
});
