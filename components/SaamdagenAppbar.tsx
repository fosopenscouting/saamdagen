import { StackHeaderProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const SaamdagenAppbar: React.FC<StackHeaderProps> = (
  props: StackHeaderProps,
) => {
  const [title, setTitle] = useState('Saamdagen');

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (props.options && props.options.headerTitle) {
      console.log(props.options);
      setTitle(props.options.headerTitle);
    }
  }, [props.options]);

  return (
    <Appbar.Header style={{backgroundColor: Colors[colorScheme].tabBackground}}>
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default SaamdagenAppbar;
