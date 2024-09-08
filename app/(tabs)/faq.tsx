import React, { useEffect, useState } from 'react';

// import FaqScreen from '@/screens/FaqScreen';
import {
	SafeAreaView,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Separator, View } from '@/components/Themed/Themed';
import { useDataContext } from '@/hooks/useDataContext';
import { ContentMetadata } from '@/models/ContentMetadata';
import { FAQ_ITEMS } from '@/constants/Strings';
import FaqCard from '@/components/FaqCard';
import { Text } from 'react-native-paper';
import { useFocusEffect } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import useColorScheme from '@/hooks/useColorScheme';

const FaqScreen: React.FC = () => {
	const { data, refreshContext, refreshing } = useDataContext();
	const [faqData, setFaqData] = useState<ContentMetadata>();
	const colorScheme = useColorScheme()

	useEffect(() => {
		if (data) {
			const filtered = data.filter((x) => x.key === FAQ_ITEMS)[0];
			setFaqData(filtered);
		}
	}, [data]);

	const handleRefresh = async () => {
		await refreshContext();
	};

	useFocusEffect(() => {
		setStatusBarStyle(colorScheme == 'light' ? 'dark' : 'light')
	})

	return (
		<SafeAreaView
			style={{
				height: '100%',
			}}
		>
			<View style={styles.container}>
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={handleRefresh}
						/>
					}
					keyExtractor={(item) => item.title}
					data={faqData?.content}
					renderItem={({ item }) => (
						<FaqCard
							title={item.title}
							text={item.content}
							icon={item.icon}
						/>
					)}
					ItemSeparatorComponent={() => (
						<Separator marginVertical={0} />
					)}
					ListFooterComponent={() => <Separator marginVertical={0} />}
				/>
			</View>
		</SafeAreaView>
	);
};

export default FaqScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'flex-start',
		// justifyContent: 'center',
	},
});
