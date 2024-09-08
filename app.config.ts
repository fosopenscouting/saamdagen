import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): Partial<ExpoConfig> => ({
	...config,
	runtimeVersion: {
		policy: 'sdkVersion',
	},
	updates: {
		url: 'https://u.expo.dev/3f3b2355-b2f7-45aa-889f-541b41c35209',
	},
	extra: {
		eas: {
			projectId: '3f3b2355-b2f7-45aa-889f-541b41c35209',
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
