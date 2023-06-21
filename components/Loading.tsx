import React, { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

type LoadingProps = {
  children: ReactNode;
  loading: boolean;
};

function Loading(props: LoadingProps): ReactNode {
  if (!props.loading) {
    return props.children;
  }
  return (
    <ActivityIndicator size="large" color={Colors.schemeIndependent.fosBlue} />
  );
}

export default Loading;
