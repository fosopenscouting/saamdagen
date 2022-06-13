import * as React from 'react';

import { List } from 'react-native-paper';
import { Text } from './Themed';

type Props = {
  title: string;
  text: string;
};

const FaqCard: React.FC<Props> = (props: Props) => {
  return (
    <List.Accordion
      titleNumberOfLines={10}
      title={props.title}
      theme={{ colors: { primary: '#c9dd01' } }}
    >
      <Text style={{ margin: 10 }}>{props.text}</Text>
    </List.Accordion>
  );
};

export default FaqCard;
