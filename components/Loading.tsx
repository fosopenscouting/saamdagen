import React, { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

type PropsWithChildren<P> = P & { children?: ReactNode };

type LoadingProps = {
  loading: boolean;
};

const Loading: React.FC<PropsWithChildren<LoadingProps>> = (
  props: PropsWithChildren<LoadingProps>,
) => {
  if (!props.loading) {
    return props.children;
  }
  console.log('loading');
  return (
    <ActivityIndicator size="large" color={Colors.schemeIndependent.fosBlue} />
  );
};

export default Loading;
