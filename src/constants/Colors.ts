enum FOSCOLORS {
  // FOS_BLUE = '#00549F',
  // FOS_GREEN = '#C9DD03',
  // SEA_GREEN = '#009784',
  // CORAL = '#ff8680',
  // WARMRED = '#ff2e00',
  // BRIGHTPINK = '#ff5999',
  // BRIGHTYELLOW = '#ffff00',

  // FOS_BLUE_DARKENED = '#00437f',

  FOS_BLUE = '#cf9452',
  FOS_GREEN = '#b68651',
  SEA_GREEN = '#6f5d2a',
  CORAL = '#9c9637',
  WARMRED = '#e3d838',
  BRIGHTPINK = '#ff5999',
  BRIGHTYELLOW = '#ffff00',

  FOS_BLUE_DARKENED = '#644018',
}

// const tintColorLight = '#c9dd01';
// const tintColorDark = '#c9dd01';
const tintColorLight = FOSCOLORS.FOS_GREEN;
const tintColorDark = FOSCOLORS.FOS_GREEN;

export default {
  FOSCOLORS,
  light: {
    text: '#000',
    background: '#f4e8d9',
    muted: '#a9a9a9',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    // tabIconSelected: tintColorLight,
    tabIconSelected: FOSCOLORS.FOS_GREEN,
    // tabBackground: '#0054',
    tabBarStyle: {
      backgroundColor: FOSCOLORS.FOS_BLUE,
    },
    tabTextColor: '#fff',
    white: '#fff',
    headerColor: FOSCOLORS.FOS_BLUE_DARKENED,
    cardBackground: '#fff',
    linkColor: '#0000FF',
    accent: '#F03CA0',
  },
  dark: {
    text: '#fff',
    background: '#261d14',
    muted: '#a9a9a9',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    // tabBackground: '#2A61A8',
    tabBarStyle: {
      backgroundColor: FOSCOLORS.FOS_BLUE,
    },
    tabTextColor: '#fff',
    white: '#fff',
    headerColor: '#fff',
    cardBackground: '#161B22',
    linkColor: '#0000FF',
    accent: '#F03CA0',
  },

  bottomBar: {
    background: FOSCOLORS.FOS_BLUE_DARKENED,
    active: FOSCOLORS.FOS_BLUE,
    activeBackground: '#4a3012',
  },
};
