import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import React from 'react';
import {
  ImageSourcePropType,
  ScrollViewProps,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const ParralaxImage: React.FC<{
  scroll: SharedValue<number>;
  offset: number;
  source: ImageSourcePropType;
}> = ({ scroll, offset, source }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scroll.value, [0, 512], [0, 1 + offset * 50]),
      },
      {
        scale: interpolate(scroll.value, [0, 512], [1, 1.2]),
      },
    ],
  }));

  return (
    <Animated.Image style={[styles.image, animatedStyle]} source={source} />
  );
};
const ParralaxLogo: React.FC<{
  scroll: SharedValue<number>;
  offset: number;
}> = ({ scroll, offset }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scroll.value, [0, 512], [0, 1 + offset * 50]),
      },
    ],
  }));
  const animatedLogoStyle = useAnimatedStyle(() => ({
    width: interpolate(scroll.value, [0, 512], [384, 128]),
    height: interpolate(scroll.value, [0, 512], [384, 128]),
  }));

  return (
    <Animated.View style={[styles.logoContainer, animatedStyle]}>
      <Animated.Image
        style={[animatedLogoStyle]}
        source={require('@/assets/images/2026/logo.png')}
      />
    </Animated.View>
  );
};

const ParralaxHeader: React.FC<
  React.PropsWithChildren<{
    refreshControl: ScrollViewProps['refreshControl'];
  }>
> = ({ refreshControl, children }) => {
  const imagePos = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    imagePos.value = event.contentOffset.y;
  });
  const colorScheme = useColorScheme();

  return (
    <Animated.ScrollView
      style={{
        height: '100%',
        backgroundColor: Colors[colorScheme].background,
      }}
      refreshControl={refreshControl}
      onScroll={scrollHandler}
    >
      <View style={styles.container}>
        <ParralaxImage
          source={require('@/assets/images/2026/layer_1.png')}
          scroll={imagePos}
          offset={0}
        />
        <ParralaxImage
          source={require('@/assets/images/2026/layer_2.png')}
          scroll={imagePos}
          offset={1}
        />
        <ParralaxImage
          source={require('@/assets/images/2026/layer_3.png')}
          scroll={imagePos}
          offset={2}
        />
        <ParralaxImage
          source={require('@/assets/images/2026/layer_4.png')}
          scroll={imagePos}
          offset={3}
        />
        <ParralaxImage
          source={require('@/assets/images/2026/layer_5.png')}
          scroll={imagePos}
          offset={4}
        />
        <ParralaxImage
          source={require('@/assets/images/2026/layer_6.png')}
          scroll={imagePos}
          offset={5}
        />
        <ParralaxImage
          source={require('@/assets/images/2026/layer_7.png')}
          scroll={imagePos}
          offset={6}
        />
        <ParralaxLogo scroll={imagePos} offset={7} />
      </View>

      {children}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    height: 512,
  },
  image: {
    height: 512,
    width: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  logoContainer: {
    height: 512,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ParralaxHeader;
