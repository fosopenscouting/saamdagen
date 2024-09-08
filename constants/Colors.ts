enum FOSCOLORS {
	FOS_BLUE = '#00549F',
	FOS_GREEN = '#C9DD03',
	SEA_GREEN = '#009784',
	CORAL = '#ff8680',
	WARMRED = '#ff2e00',
	BRIGHTPINK = '#ff5999',
	BRIGHTYELLOW = '#ffff00',

	FOS_BLUE_DARKENED = '#00437f'
}

// const tintColorLight = '#c9dd01';
// const tintColorDark = '#c9dd01';
const tintColorLight = FOSCOLORS.FOS_GREEN;
const tintColorDark = FOSCOLORS.FOS_GREEN;

export default {
	FOSCOLORS,
	light: {
		text: '#000',
		background: '#f5f5f5',
		muted: '#a9a9a9',
		tint: tintColorLight,
		tabIconDefault: '#ccc',
		// tabIconSelected: tintColorLight,
		tabIconSelected: FOSCOLORS.FOS_GREEN,
		// tabBackground: '#0054',
		tabBarStyle: {
			backgroundColor: FOSCOLORS.FOS_BLUE
		},
		tabTextColor: 'white',
		white: 'white',
		headerColor: '#2A61A8',
		cardBackground: 'white',
		linkColor: '#0000FF',
		accent: '#F03CA0',
	},
	dark: {
		text: '#fff',
		background: '#161B22',
		muted: '#a9a9a9',
		tint: tintColorDark,
		tabIconDefault: '#ccc',
		tabIconSelected: tintColorDark,
		// tabBackground: '#2A61A8',
		tabBarStyle: {
			backgroundColor: FOSCOLORS.FOS_BLUE
		},
		tabTextColor: 'white',
		white: 'white',
		headerColor: 'white',
		cardBackground: '#161B22',
		linkColor: '#0000FF',
		accent: '#F03CA0',
	}
};
