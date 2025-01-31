import React from 'react';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import ContentCard, { ThemeIdentifier, themes } from './ContentCard';
import { HeaderText, Markdown } from './Themed/Themed';
import { StyleProp, StyleSheet, ViewStyle, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getTextColor = (
  colorScheme: 'light' | 'dark',
  palette: ThemeIdentifier,
  mode: 'outlined' | 'elevated' | undefined,
) => {
  // Item is filled
  if (mode === 'elevated') {
    return themes[palette].textColor;
  }
  if (mode === 'outlined') {
    return Colors[colorScheme].text;
  }
};

type Props = {
  title: string;
  content: string;
  mode: 'elevated' | 'outlined';
  palette: ThemeIdentifier;
  containerStyle?: StyleProp<ViewStyle>;
  hasLink?: boolean;
};

const BasicCard: React.FC<Props> = (props: Props) => {
  const colorScheme = useColorScheme();
  const textColor = getTextColor(colorScheme, props.palette, props.mode);

  return (
    <ContentCard
      containerStyle={props.containerStyle}
      mode={props.mode}
      palette={props.palette}
    >
      <View style={styles.titleContainer}>
        <HeaderText
          variant="bodyMedium"
          style={[{ color: textColor }, styles.title]}
        >
          {props.title}
        </HeaderText>
        {props.hasLink ? (
          <MaterialCommunityIcons style={styles.linkArrow} name="arrow-right" color={'white'} />
        ) : null}
      </View>
      <Markdown markdownStyles={{ text: { color: textColor } }}>
        {props.content}
      </Markdown>
    </ContentCard>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    maxWidth: '90%'
  },
  linkArrow: {
    marginLeft: 'auto',
    fontSize: 22
  }
});

export default BasicCard;
