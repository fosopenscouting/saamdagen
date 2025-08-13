import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config';
import { withSentry } from '@sentry/react-native/expo';

export default withSentry(
  //@ts-expect-error withSentry expects full config, only passing Partial
  ({ config }: ConfigContext): Partial<ExpoConfig> => ({
    ...config,
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    updates: {
      url: 'https://u.expo.dev/7830594e-890b-4c9e-89cf-b91bf1926f72',
    },
    extra: {
      eas: {
        projectId: '7830594e-890b-4c9e-89cf-b91bf1926f72',
      },
    },
    android: {
      ...config.android,
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
    },
  }),
  {
    organization: 'fosopenscouting',
    project: 'saamdagen-app',
    url: 'https://sentry.io/',
  },
);
