/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';

import { Separator, View } from '../components/Themed/Themed';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import FaqCard from '../components/FaqCard';
import { FAQ_ITEMS } from '../constants/Strings';
import { useDataContext } from '../hooks/useDataContext';
import { ContentMetadata } from '../models/ContentMetadata';

const FaqScreen: React.FC = () => {
	const { data, refreshContext, refreshing } = useDataContext();
	const [faqData, setFaqData] = useState<ContentMetadata>();

	useEffect(() => {
		if (data) {
			const filtered = data.filter((x) => x.key === FAQ_ITEMS)[0];
			setFaqData(filtered);
		}
	}, [data]);

	const handleRefresh = async () => {
		await refreshContext();
	};
	return (
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
				ItemSeparatorComponent={() => <Separator marginVertical={0} />}
				ListFooterComponent={() => <Separator marginVertical={0} />}
			/>
		</View>
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
