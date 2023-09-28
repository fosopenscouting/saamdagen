import React, { useContext ,useState,useEffect} from 'react';
import { FlatList, Image } from 'react-native';
import NavigationListItem from '../components/NavigationListItem';
import { Separator, View } from '../components/Themed/Themed';
import { TicketMetadata } from '../models/TicketMetadata';
import { useDataContext } from '../hooks/useTicketContext';

const MoreScreen: React.FC = () => {

  const { data, refreshContext, refreshing } = useDataContext();
  const [TicketData, setTicketData] = useState<TicketMetadata>();

  useEffect(() => {
    if (data) {
      const filtered = data.filter((x) => x.key === VOLUNTEER_ITEMS)[0];
      console.log(filtered)

      setTicketData(filtered);
    }
  }, [data]);

  const handleRefresh = async () => {
    await refreshContext();
  };

  // Always try to refresh data on load. We can do it here because the screen is never unmounted in the bottom tab.
  useEffect(() => {
    const refreshAsync = async () => {
      await refreshContext();
    };
    refreshAsync();
  }, []);






console.log(TicketData)






  const items = [
    {
      title: 'Mijn Saamdagen',
      destination: 'ProfileScreen',
      icon: 'heart-outline',
    },
    {
      title: 'Helpende hand',
      destination: 'VolunteerScreen',
      icon: 'heart-outline',
    },
    /* {
      title: 'Instellingen',
      destination: 'SettingsScreen',
      icon: 'tune-vertical',
    },*/
  ];

  // if (Ticket?.ticketType === 'Medewerker')
  //   items.push({
  //     title: 'Helpende hand',
  //     destination: 'VolunteerScreen',
  //     icon: 'heart-outline',
  //   });

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
