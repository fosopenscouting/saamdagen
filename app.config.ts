import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): Partial<ExpoConfig> => ({
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
	plugins: [
		[
			'@sentry/react-native/expo',
			{
				organization: process.env.SENTRY_ORG,
				project: process.env.SENTRY_PROJECT,
			},
		],
		'expo-asset',
		'expo-font',
		'expo-router',
	],
});
