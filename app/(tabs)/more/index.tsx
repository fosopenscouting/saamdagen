<<<<<<< HEAD
import React from "react";
=======
import React from 'react';
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f

import { FlatList } from 'react-native';
import NavigationListItem from '@/components/NavigationListItem';
import { Separator, View } from '@/components/Themed/Themed';

const MoreScreen: React.FC = () => {
<<<<<<< HEAD
	const items = [
		{
			title: 'Mijn Saamdagen',
			destination: '/more/profile',
			icon: 'heart-outline',
		},
		// {
		// 	title: 'Instellingen',
		// 	destination: '/more/settings',
		// 	icon: 'tune-vertical',
		// },
		{
			title: 'Licenties',
			destination: '/more/licenses',
			icon: 'scale-balance',
		},
		{
			title: 'Over',
			destination: '/more/about',
			icon: 'information-outline',
		},
	];

	return (
		<View style={{ height: '100%' }}>
			<FlatList
				data={items}
				contentContainerStyle={{ paddingHorizontal: 10 }}
				keyExtractor={(item) => item.title}
				ItemSeparatorComponent={() => <Separator marginVertical={1} />}
				ListFooterComponent={() => <Separator marginVertical={1} />}
				renderItem={(item) => (
					<NavigationListItem
						title={item.item.title}
						destination={item.item.destination}
						icon={item.item.icon}
					/>
				)}
			/>
		</View>
	);
=======
  const items = [
    {
      title: 'Mijn Saamdagen',
      destination: '/more/profile',
      icon: 'heart-outline',
    },
    // {
    // 	title: 'Instellingen',
    // 	destination: '/more/settings',
    // 	icon: 'tune-vertical',
    // },
    {
      title: 'Over',
      destination: '/more/about',
      icon: 'information-outline',
    },
  ];

  return (
    <View style={{ height: '100%' }}>
      <FlatList
        data={items}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => <Separator marginVertical={1} />}
        ListFooterComponent={() => <Separator marginVertical={1} />}
        renderItem={(item) => (
          <NavigationListItem
            title={item.item.title}
            destination={item.item.destination}
            icon={item.item.icon}
          />
        )}
      />
    </View>
  );
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
};

export default MoreScreen;
