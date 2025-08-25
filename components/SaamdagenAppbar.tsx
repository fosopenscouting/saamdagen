import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const SaamdagenAppbar: React.FC<NativeStackHeaderProps> = (
  props: NativeStackHeaderProps,
) => {
  const [title, setTitle] = useState('Saamdagen');

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (props.options && props.options.headerTitle) {
      setTitle(props.options.headerTitle);
    }
  }, [props.options]);

  return (
    <Appbar.Header style={Colors[colorScheme].tabBarStyle}>
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} color='#fff' />
      ) : null}
      <Appbar.Content
        titleStyle={[
          { color: Colors[colorScheme].tabTextColor },
          props.options.headerTitleStyle,
        ]}
        title={title}
      />
    </Appbar.Header>
  );
};

export default SaamdagenAppbar;
