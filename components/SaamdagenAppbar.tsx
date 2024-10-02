import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
<<<<<<< HEAD
import { NativeStackHeaderProps } from "@react-navigation/native-stack"


=======
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
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
<<<<<<< HEAD
    <Appbar.Header
      style={Colors[colorScheme].tabBarStyle}
    >
=======
    <Appbar.Header style={Colors[colorScheme].tabBarStyle}>
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default SaamdagenAppbar;
