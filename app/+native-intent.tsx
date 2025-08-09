import { getTicketFromApi, storeTicket } from '@/services/ticketService';

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

            return '/more/profile';
          } catch (error) {
            console.log(error);
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
