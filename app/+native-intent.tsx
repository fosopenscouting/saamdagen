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
  const alerts = useAlerts();
  const toaster = useToast();

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

            alerts.alert(
              'Ticket toegevoegd!',
              'Jouw ticket is nu toegevoegd aan de app.',
              [
                {
                  text: 'Top!',
                  style: 'cancel',
                  onPress() {
                    router.navigate('/more/profile');
                  },
                },
              ],
            );
          } catch (error) {
            toaster.show({
              position: 'top',
              type: 'error',
              message:
                'Er ging iets fout toen we je ticket probeerden te laden. Probeer het opnieuw.',
            });

            //Log error naar Sentry
            Sentry.captureMessage(
              `Ticket kon niet gescand worden: ${error}`,
              'error',
            );
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
