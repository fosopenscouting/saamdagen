import * as React from 'react';

import { List } from 'react-native-paper';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Markdown, View } from './Themed';

type Props = {
  title: string;
  text: string;
  icon: string;
};

const FaqCard: React.FC<Props> = (props: Props) => {
  const colorScheme = useColorScheme();
  return (
    <>
      <List.Accordion
        left={(innerProps) => (
          <List.Icon
            {...innerProps}
            color={Colors[colorScheme].text}
            icon={props.icon}
          />
        )}
        titleNumberOfLines={10}
        title={props.title}
        theme={{ colors: { primary: Colors.schemeIndependent.fosGreen } }}
      >
        <View style={{ marginLeft: -40, marginRight: 8 }}>
          <Markdown>{props.text}</Markdown>
        </View>
      </List.Accordion>
    </>
  );
};

export default FaqCard;
