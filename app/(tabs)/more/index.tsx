import React from 'react';

import { FlatList } from 'react-native';
import NavigationListItem from '@/components/NavigationListItem';
import { Separator, View } from '@/components/Themed/Themed';

const MoreScreen: React.FC = () => {
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
    {
      title: 'Licenties',
      destination: '/more/licenses',
      icon: 'scale-balance',
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
};

export default MoreScreen;
