import { getTicketFromApi, storeTicket } from '@/services/ticketService';
import { router } from 'expo-router';
import { useAlerts } from 'react-native-paper-alerts';
import { useToast } from 'react-native-paper-toast';
import * as Sentry from '@sentry/react-native';

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
          try {
            await storeTicket(res, hash);
            
            return '/more/profile'
          } catch (error) {
            console.log(error)
          }

          return '/more/profile';
        });
      } else {
        return 'not-found';
      }
    }

    if (initial) {
      return path;
    }

    return path;

    //eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return 'not-found';
  }
}
