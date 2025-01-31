import React, { useState } from 'react';

import { List } from 'react-native-paper';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { Markdown, View } from '@/components/Themed/Themed';

type Props = {
  title: string;
  text: string;
  icon: string;
};

const FaqCard: React.FC<Props> = (props: Props) => {
  const colorScheme = useColorScheme();

  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded)
  
  return (
    <>
      <List.Accordion
        left={(innerProps) => (
          <List.Icon
            {...innerProps}
            color={expanded ? Colors.FOSCOLORS.FOS_GREEN : Colors[colorScheme].headerColor}
            icon={props.icon}
          />
        )}
        expanded={expanded}
        onPress={handlePress}
        titleNumberOfLines={10}
        title={props.title}
        titleStyle={{
          fontFamily: 'Quicksand_500Medium'
        }}
        theme={{
          colors: {
            primary: Colors.FOSCOLORS.FOS_GREEN,
            background: Colors[colorScheme].background,
          },
        }}
      >
        <View style={{ marginLeft: -20, marginRight: 10, paddingBottom: 10 }}>
          <Markdown>{props.text}</Markdown>
        </View>
      </List.Accordion>
    </>
  );
};

export default FaqCard;
