import React from 'react';
import { Text as DefaultText } from 'react-native-paper';
import { useThemeColor, TextProps } from './Helpers';

export const Text: React.FC<TextProps> = (props: TextProps) => {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
	const fontFamily = 'Quicksand_300Light';
	return (
		<DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />
	);
};
