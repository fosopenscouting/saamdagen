import React, { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import Colors from '../constants/Colors';

type LoadingProps = {
	children: ReactNode;
	loading: boolean;
};

function Loading(props: LoadingProps): ReactNode {
<<<<<<< HEAD
	if (!props.loading) {
		return props.children;
	}
	return <ActivityIndicator size="large" color={Colors.FOSCOLORS.FOS_BLUE} />;
=======
  if (!props.loading) {
    return props.children;
  }
  return <ActivityIndicator size="large" color={Colors.FOSCOLORS.FOS_BLUE} />;
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
}

export default Loading;
