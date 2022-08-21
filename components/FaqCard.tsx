import * as React from 'react';

import { List } from 'react-native-paper';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Markdown, Separator, Text } from './Themed';

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
        <Markdown style={{ margin: 5 }}>{props.text}</Markdown>
      </List.Accordion>
    </>
  );
};

export default FaqCard;
