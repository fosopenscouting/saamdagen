import { getTicketFromApi, storeTicket } from '@/services/ticketService';
import { router } from 'expo-router';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

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

            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Ticket toegevoegd',
              textBody: 'Jouw ticket is nu toegevoegd aan de app.',
              button: 'Top!',
              onPressButton: () => {
                Dialog.hide();
                router.navigate('/more/profile');
              },
            });
          } catch (error) {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: 'Er is een fout opgetreden',
              textBody:
                'Er ging iets fout toen we je ticket probeerden te laden. Probeer het opnieuw.',
            });
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
  } catch (error) {
    return 'not-found';
  }
}
