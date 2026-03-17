import React from 'react';
import { Appbar } from 'react-native-paper';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { getHeaderTitle } from '@react-navigation/elements';

const SaamdagenAppbar: React.FC<any> = (props: any) => {
  const colorScheme = useColorScheme();
  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header style={Colors[colorScheme].tabBarStyle}>
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} color="#fff" />
      ) : null}
      <Appbar.Content
        titleStyle={[
          { color: Colors[colorScheme].tabTextColor },
          props.options.headerTitleStyle,
        ]}
        title={title}
      />
      {props.options.headerRight ? props.options.headerRight() : null}
    </Appbar.Header>
  );
};

export default SaamdagenAppbar;
