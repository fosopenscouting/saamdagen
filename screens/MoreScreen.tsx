import React from 'react';
import { FlatList, Image } from 'react-native';
import NavigationListItem from '../components/NavigationListItem';
import { Separator, View } from '../components/Themed';

const MoreScreen: React.FC = () => {
  const items = [
    {
      title: 'Mijn Saamdagen',
      destination: 'ProfileScreen',
      icon: 'heart-outline',
    },
    {
      title: 'Instellingen',
      destination: 'SettingsScreen',
      icon: 'tune-vertical',
    },
  ];

  return (
    <View style={{ height: '100%' }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={() => (
          <Image
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 2.6,
              resizeMode: 'cover',
            }}
            source={require('../assets/images/banner.jpg')}
          />
        )}
        ItemSeparatorComponent={() => <Separator marginVertical={0} />}
        ListFooterComponent={() => <Separator marginVertical={0} />}
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
