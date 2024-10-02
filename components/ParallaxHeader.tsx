import React, { useRef } from 'react';
import {
	StyleSheet,
	View,
	Animated,
} from 'react-native';
import { Image, ImageBackground } from "expo-image"
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import SaamdagenAppbar from '@/components/SaamdagenAppbar';
import { StackHeaderProps } from '@react-navigation/stack';
import Colors from '@/constants/Colors';

const { event, ValueXY } = Animated;

const ParallaxHeader: React.FC<StackHeaderProps> = (
	props: StackHeaderProps & { refreshControl },
) => {
	const scrollY = useRef(new ValueXY()).current;

  const renderForeground = () => (
    <View>
      <ImageBackground
        imageStyle={{ opacity: 0.6 }}
        source={require('../assets/images/home-banner-2.png')}
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
            style={{
              marginTop: 26,
              height: '70%',
              resizeMode: 'contain',
            }}
            source={require('../assets/images/logo.png')}
          />
        </View>
      </ImageBackground>
    </View>
  );
	const renderForeground = () => (
		<View>
			<ImageBackground
				imageStyle={{ opacity: 0.6 }}
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
						style={{
							marginTop: 26,
							height: '70%',
							resizeMode: 'contain',
						}}
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
					<SaamdagenAppbar />
				</Animated.View>
			</>
		);
	};

	return (
		<StickyParallaxHeader
			transparentHeader
			hasBorderRadius={false}
			scrollEvent={event(
				[{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
				{
					useNativeDriver: false,
				},
			)}
			parallaxHeight={430}
			foreground={renderForeground()}
			header={renderHeader()}
			snapStartThreshold={50}
			snapStopThreshold={180}
			snapValue={180}
			refreshControl={props.refreshControl}
		>
			{props.children}
		</StickyParallaxHeader>
	);
};

const styles = StyleSheet.create({
<<<<<<< HEAD
	foregroundImage: {
		width: '100%',
		height: 430,
		backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
	},
=======
  foregroundImage: {
    width: '100%',
    height: 430,
    backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
  },
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
});

export default ParallaxHeader;
