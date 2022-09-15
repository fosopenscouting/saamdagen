import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): Partial<ExpoConfig> => ({
  ...config,
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  updates: {
    url: 'https://u.expo.dev/7830594e-890b-4c9e-89cf-b91bf1926f72'
  },
  extra: {
    eas: {
      projectId: '7830594e-890b-4c9e-89cf-b91bf1926f72',
    },
  },
});
