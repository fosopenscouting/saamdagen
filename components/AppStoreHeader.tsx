import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import SaamdagenAppbar from './SaamdagenAppbar';
import { StackHeaderProps } from '@react-navigation/stack';
import SaamdagenLogo from './SaamdagenLogo';

const { event, ValueXY } = Animated;

const AppStoreHeader: React.FC<StackHeaderProps> = (
  props: StackHeaderProps,
) => {
  const scrollY = useRef(new ValueXY()).current;

  const renderForeground = () => (
    <View>
      <ImageBackground
        source={require('../assets/images/home-banner.png')}
        style={styles.foregroundImage}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{marginTop: 26, height: '70%', resizeMode: 'contain' }}
            source={require('../assets/images/logo.png')}
          />
        </View>
      </ImageBackground>
    </View>
  );

  const renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 110, 150],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    return (
      <>
        <Animated.View style={{ opacity }}>
          <SaamdagenAppbar {...props} />
        </Animated.View>
      </>
    );
  };

  return (
    <StickyParallaxHeader
      contentContainerStyles={{
        marginTop: 17,
      }}
      hasBorderRadius={false}
      scrollEvent={event(
        [{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
        {
          useNativeDriver: false,
        },
      )}
      parallaxHeight={300}
      transparentHeader
      foreground={renderForeground()}
      header={renderHeader()}
      snapStartThreshold={50}
      snapStopThreshold={300}
      snapValue={180}
    >
      {props.children}
    </StickyParallaxHeader>
  );
};

const styles = StyleSheet.create({
  foregroundImage: {
    width: '100%',
    height: 317,
  },
  foregroundContainer: {
    flexDirection: 'row',
    marginBottom: 100,
    marginTop: 27,
    marginLeft: 27,
  },
});

export default AppStoreHeader;
