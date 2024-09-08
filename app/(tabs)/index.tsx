import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	ScrollView,
	Image,
	ImageBackground,
	View,
} from 'react-native';
import CountdownTimer from '@/components/CountDownTimer';
import BasicCard from '@/components/BasicCard';
import { HomeScreenSection } from '@/models/HomeScreenSection';
import { HOME_ITEMS } from '@/constants/Strings';
import { useDataContext } from '@/hooks/useDataContext';
import Colors from '@/constants/Colors';
import ContentCard from '@/components/ContentCard';
import { Text } from '@/components/Themed/Text';
import { RefreshControl } from 'react-native-gesture-handler';
import * as Updates from 'expo-updates';
import { Banner } from 'react-native-paper';
import { ExecutionEnvironment } from 'expo-constants';
import { ContentMetadata } from '@/models/ContentMetadata';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen: React.FC = () => {
	const { data, refreshContext, refreshing } = useDataContext();
	const [filteredData, setFilteredData] = useState<
		ContentMetadata | undefined
	>();
	const [snackbarVisible, setUpdateSnackbarVisible] = useState(false);

	const handleRefresh = async () => {
		await refreshContext();
	};

	//Automatic update in background
	async function onFetchUpdateAsync() {
		const isStandalone = ExecutionEnvironment.Standalone === 'standalone';
		if (isStandalone) return;

		try {
			const update = await Updates.checkForUpdateAsync();

			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				setUpdateSnackbarVisible(true);
			}
		} catch (error) {
			alert(`Error fetching latest Expo update: ${error}`);
		}
	}

	// Always try to refresh data on load. We can do it here because the screen is never unmounted in the bottom tab.
	useEffect(() => {
		const refreshAsync = async () => {
			await refreshContext();
		};
		refreshAsync();
		onFetchUpdateAsync();
	}, []);

	useEffect(() => {
		setFilteredData(data?.filter((x) => x.key === HOME_ITEMS)[0]);
	}, [data]);

	const handleDismissSnackbar = () => {
		setUpdateSnackbarVisible(false);
	};

	const handleUpdateApp = async () => {
		try {
			await Updates.reloadAsync();
		} catch (error) {
			alert(`Error updating the app: ${error}`);
		}
	};

	return (
		<>
			<ScrollView
				style={{ height: '100%' }}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
					/>
				}
			>
				<ImageBackground
					imageStyle={{ opacity: 0.6 }}
					source={require('@/assets/images/home-banner.png')}
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
							source={require('@/assets/images/logo.png')}
						/>
					</View>
				</ImageBackground>
				<CountdownTimer
					targetDate={new Date('2024-09-27T20:00:00+02:00')}
				/>
				<ContentCard
					containerStyle={styles.saamregels}
					palette="fosBlue"
					backgroundImage={require('@/assets/images/saamregels.png')}
				>
					{/* @ts-ignore */}
					<Text style={styles.countdownTitle}></Text>
				</ContentCard>
				{filteredData?.content?.map(
					(item: HomeScreenSection, index: number) => (
						<BasicCard
							key={item.order}
							containerStyle={[
								styles.basicCard,
								index === filteredData?.content.length - 1
									? styles.lastCard
									: null,
							]}
							content={item.content}
							title={item.title}
							mode="elevated"
							palette="fosBlue"
						/>
					),
				)}
			</ScrollView>
			<Banner
				visible={snackbarVisible}
				actions={[{
					label: 'Updaten',
					onPress: handleUpdateApp,
				}]}
				icon={({ size }) => (
					<MaterialCommunityIcons
						name="update"
						color="#fff"
						size={size}
					/>
				)}
			>
				Er is een update beschikbaar! Maak je helemaal klaar voor Saamdagen door de nieuwste versie van de app te downloaden.
			</Banner>
		</>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	basicCard: {
		marginHorizontal: 8,
		marginTop: 8,
	},
	lastCard: {
		marginBottom: 8,
	},
	logo: {
		padding: 4,
		color: 'white',
		flex: 1,
		alignItems: 'center',
		margin: 16,
	},
	content: {
		marginBottom: 5,
		textAlign: 'justify',
	},
	container: {
		flex: 1,
	},
	regularTitle: {
		color: 'white',
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
	eventH3: {
		fontSize: 16,
		flex: 1,
	},
	eventSeparator: {
		borderBottomWidth: 2,
		marginTop: 10,
	},
	foregroundImage: {
		width: '100%',
		height: 430,
		backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
		marginBottom: 5,
	},
	saamregels: {
		marginHorizontal: 8,
		height: 200,
	},
	countdownTitle: {
		height: '100%',
	},
});
