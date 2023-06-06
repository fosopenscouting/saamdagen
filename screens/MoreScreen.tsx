import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import NavigationListItem from '../components/NavigationListItem';
import { Separator, View } from '../components/Themed';
import { getTicketFromStorage } from '../services/TicketService';
import { Ticket } from '../models/Ticket';
import { TicketContext } from '../components/contexts/TicketProvider';

const MoreScreen: React.FC = () => {
  const { ticketData } =  useContext(TicketContext);
 

  const items = [
    {
      title: 'Mijn Saamdagen',
      destination: 'ProfileScreen',
      icon: 'heart-outline',
    },
    /* {
      title: 'Instellingen',
      destination: 'SettingsScreen',
      icon: 'tune-vertical',
    },*/
  ];
  console.log(ticketData);

  

  if (ticketData?.ticketType === 'Medewerker')
    items.push({
      title: 'Helpende hand',
      destination: 'VolunteerScreen',
      icon: 'heart-outline',
    });

  return (
    <View style={{ height: '100%' }}>
      <FlatList
        data={items}
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
