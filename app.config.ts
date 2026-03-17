import 'dotenv/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const getUID = () => (IS_DEV ? 'be.fos.saamdagen.dev' : 'be.fos.saamdagen');
const getAppName = () => (IS_DEV ? 'Saamdagen (DEV)' : 'Saamdagen');
const getGoogleServiceFile = () => {
  if (IS_DEV)
    return process.env.GOOGLE_SERVICES_JSON_DEV ?? './google-services.dev.json';

  return process.env.GOOGLE_SERVICES_JSON ?? './google-services.json';
};
const getIconUrl = (icon: string) =>
  `./assets/images/icon/${IS_DEV ? 'DEV/' : ''}${icon}`;

export default {
  name: getAppName(),
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
    bundleIdentifier: getUID(),
    infoPlist: {
      NSCameraUsageDescription:
        'Je camera wordt gebruikt om je ticket te scannen en zo persoonlijke info te krijgen zoals bijvoorbeeld de workshops waarvoor je bent ingeschreven.',
      UIBackgroundModes: ['fetch'],
    },
    icon: {
      dark: getIconUrl('ios_dark.png'),
      tinted: getIconUrl('ios_tinted.png'),
    },
  },
  android: {
    package: getUID(),
    adaptiveIcon: {
      foregroundImage: './assets/images/icon/adaptive-icon.png',
      backgroundImage: getIconUrl('adaptive-icon-bg.png'),
      monochromeImage: getIconUrl('monochrome.png'),
    },
    permissions: ['CAMERA'],
    googleServicesFile: getGoogleServiceFile(),
    predictiveBackGestureEnabled: true,
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
      '@sentry/react-native',
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
};
