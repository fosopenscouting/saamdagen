import React, { useCallback, useEffect, useState } from 'react';

import { FlatList } from 'react-native';
import NavigationListItem, {
  NavigationListItemProps,
} from '@/components/NavigationListItem';
import { Separator, View } from '@/components/Themed/Themed';
import { getTicketFromStorage } from '@/services/ticketService';
import { Ticket } from '@/models/Ticket';
import { useFocusEffect } from 'expo-router';

const MoreScreen: React.FC = () => {
  const [items, setItems] = useState<NavigationListItemProps[]>([
    {
      title: 'Mijn Saamdagen',
      destination: '/more/profile',
      icon: 'heart-outline',
    },
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
    {
      title: 'Instellingen',
      destination: '/more/settings',
      icon: 'cogs',
    },
  ]);
  const [ticketData, setTicketData] = useState<Ticket | null>();

  useFocusEffect(
    useCallback(() => {
      getTicketFromStorage().then((res) => {
        setTicketData(res);
      });
    }, []),
  );

  const addItem = (item: NavigationListItemProps) => {
    if (items.find((i) => i.title == item.title)) return;

    setItems((prev) => [...prev, item]);
  };

  useEffect(() => {
    if (ticketData?.ticketType == 'medewerker')
      addItem({
        title: 'Info voor medewerkers',
        description: ticketData.ticketType,
        icon: 'calendar',
        destination: '/more/volunteer',
      });
  }, [ticketData]);

  return (
    <View style={{ height: '100%' }}>
      <FlatList
        data={items}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => <Separator marginVertical={1} />}
        ListFooterComponent={() => <Separator marginVertical={1} />}
        renderItem={({ item }) => <NavigationListItem {...item} />}
      />
    </View>
  );
};

export default MoreScreen;
