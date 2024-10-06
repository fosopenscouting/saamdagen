import { getTicketFromApi, storeTicket } from '@/services/ticketService';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}) {
  try {
    const url = new URL(path);

    if (
      url.pathname.includes('/more/profile') &&
      url.searchParams.has('hash')
    ) {
      const hash = url.searchParams.get('hash');
      if (hash) {
        return getTicketFromApi(hash).then(async (res) => {
          await storeTicket(res, hash);

          Alert.alert(
            'Ticket toegevoegd',
            'Jouw ticket is nu toegevoegd aan de app.',
            [
                {
                    text: 'Top!',
                    onPress: () => {
                        router.navigate('/more/profile')
                    }
                }
            ]
          )

          return '/more/profile';
        });
      }else{
        return 'not-found'
      }
    }

    if (initial) {
      return path;
    }

    return path;
  } catch (error) {
    return 'not-found';
  }
}
