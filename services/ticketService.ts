/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ticket } from '@/models/Ticket';

export const storeTicket = async (
  data: any,
  secret: string,
): Promise<Ticket> => {
  try {
    //Sanity check on data
    if (!Object.hasOwn(data, 'secret')) throw new Error('Not a valid ticket!');

    const ticket: Ticket = {
      firstName: data.firstName,
      lastName: data.lastName,
      ticketType: data.type,
      workshop: data.workshop ?? null,
      secret,
      url: data.url,
    };
    await AsyncStorage.setItem('sd_ticket', JSON.stringify(ticket));
    return ticket;
  } catch (e: any) {
    console.error(e);
    throw new Error(e);
  }
};

export const getTicketFromStorage = async (): Promise<Ticket | undefined> => {
  const ticket = await AsyncStorage.getItem('sd_ticket');

  if (ticket) {
    return JSON.parse(ticket);
  }
};

export const getTicketFromApi = async (ticketUrl: string): Promise<any> => {
  //Provided ticketUrl is the full url, we only need the last bit
  const ticketUrlSplit = ticketUrl.split(/\//g);
  const secret = ticketUrlSplit[ticketUrlSplit.length - 1];

  const url = `${process.env.EXPO_PUBLIC_SAAMDAGEN_SERVER}/api/ticket/${secret}`;

  const res = await fetch(url, {
    method: 'GET',
  });
  return await res.json();
};
