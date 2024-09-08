import React from 'react';
import { HeaderText, Separator, View } from '@/components/Themed/Themed';
import {
	StyleSheet,
	ScrollView,
	Alert,
	Modal,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import NoProfile from '@/components/Profile/NoProfile';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ticket } from '@/models/Ticket';
import SvgQRCode from 'react-native-qrcode-svg';
import Colors from '@/constants/Colors';
import Profile from '@/components/Profile/Profile';
import * as Brightness from 'expo-brightness';
import {
	getTicketFromApi,
	getTicketFromStorage,
	storeTicket,
} from '@/services/ticketService';
import Loading from '@/components/Loading';
import { Button } from 'react-native-paper';
import { Text } from "@/components/Themed/Text"

const ProfileScreen: React.FC = () => {
	const [ticketData, setTicketData] = useState<Ticket | null>();
	const [modalVisible, setModalVisible] = useState(false);
	const [initialBrightness, setInitialBrightness] = useState<number>(0);
	const navigation = useNavigation();
	const [ticketLoading, setTicketLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const brightness = await Brightness.getSystemBrightnessAsync();
			setInitialBrightness(brightness);
		})();
	}, []);

	useEffect(() => {
		const state = navigation.getState();
        //@ts-ignore
		const hash = state?.routes[0]?.params?.hash;
		if (hash) {
			setTicketLoading(true);
			getTicketFromApi(hash).then(async (res) => {
				const ticket = await storeTicket(res, hash);
				setTicketData(ticket);
				setTicketLoading(false);
			});
		}
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getTicketFromStorage().then((res) => {
				setTicketData(res);
			});
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		(async () => {
			if (modalVisible) {
				const brightness = await Brightness.getBrightnessAsync();
				setInitialBrightness(brightness);
				Brightness.setBrightnessAsync(1);
			}
		})();
	}, [modalVisible]);

	const resetModal = () => {
		setModalVisible(false);
		(async () => {
			Brightness.setBrightnessAsync(initialBrightness);
		})();
	};

	const showConfirmDialog = () => {
		return Alert.alert(
			'Ben je zeker',
			'Ben je zeker dat je je ticket wil verwijderen?',
			[
				{
					text: 'Ja',
					onPress: () => {
						deleteTicket();
					},
				},
				{
					text: 'Nee',
				},
			],
		);
	};

	const deleteTicket = async () => {
		await AsyncStorage.removeItem('sd_ticket');
		setTicketData(null);
	};

	const handleQrPress = () => {
		setModalVisible(!modalVisible);
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View
				style={styles.container}
				lightColor={Colors.light.background}
				darkColor={Colors.dark.background}
			>
				<Loading loading={ticketLoading}>
					{ticketData ? (
						<View style={styles.profileContainer}>
							<Modal
								presentationStyle="fullScreen"
								animationType="slide"
								visible={modalVisible}
								onRequestClose={resetModal}
							>
								<TouchableOpacity
									style={styles.container}
									activeOpacity={1}
									onPressOut={resetModal}
								>
									<View
										style={[
											styles.qrModal,
											styles.qrContainer,
										]}
									>
										<SvgQRCode
											size={300}
											value={ticketData.hash}
										/>
									</View>
								</TouchableOpacity>
							</Modal>

                            <Profile
								firstName={ticketData.firstName}
								lastName={ticketData.lastName}
								beforeNoon={ticketData.workshopBeforeNoon}
								participantType={ticketData.ticketType}
							>
                                <Pressable onPress={handleQrPress}>
                                    <View style={styles.qrContainer}>
                                        <SvgQRCode
                                            size={130}
                                            value={ticketData.hash}
                                        />
                                    </View>
                                </Pressable>
                            </Profile>

							<Separator marginVertical={0} />

							<Button
                                mode='contained'
								buttonColor={Colors.FOSCOLORS.WARMRED}
                                textColor='white'
                                icon="delete"
                                style={{
                                    margin: 16
                                }}
								onPress={showConfirmDialog}
							>Ticket verwijderen</Button>
						</View>
					) : (
						<View style={styles.profileContainer}>
							<NoProfile />
						</View>
					)}
				</Loading>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
    profileContainer: {
		flex: 1,
		width: '100%',
	},
	qrContainer: {
		backgroundColor: Colors.light.white,
		padding: 15,
		alignItems: 'center',
		borderRadius: 8,
	},
	qrModal: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	separator: {
		marginVertical: 24,
		height: 1,
		width: '100%',
	},
});

export default ProfileScreen;
