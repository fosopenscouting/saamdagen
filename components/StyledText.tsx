import * as React from 'react';

import { Text, TextProps } from './Themed/Themed';

const MonoText: React.FC = (props: TextProps) => {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
};

export default MonoText;
