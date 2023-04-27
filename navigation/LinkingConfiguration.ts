/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.createURL('/'), 'saamdagen://'],
  config: {
    screens: {
      Root: {
        screens: {
          Meer: {
            screens: {
              initialRouteName: 'MoreScreen',
              ProfileScreen: 'Ticket',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
