import * as React from 'react';

import { List } from 'react-native-paper';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Markdown, View } from './Themed/Themed';

type Props = {
	title: string;
	text: string;
	icon: string;
};

const FaqCard: React.FC<Props> = (props: Props) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
};

export default FaqCard;
