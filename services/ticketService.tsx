/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ticket } from '../models/Ticket';

export const storeTicket = async (
  data: any,
  ticketHash: string,
): Promise<Ticket> => {
  try {
    const formValues = data.data.submissionData.data.formValues;
    const workshopsBeforeNoon =
      data.data.submissionData.formElements.workshops_voormiddag;
    const ticket: Ticket = {
      firstName: data.data.firstName,
      lastName: data.data.lastName,
      ticketType: formValues.type_deelnemer_keuze,
      workshopBeforeNoon: formValues.workshops_voormiddag
        ? workshopsBeforeNoon['#options'][formValues.workshops_voormiddag]
        : null,
      hash: ticketHash,
    };
    await AsyncStorage.setItem('sd_ticket', JSON.stringify(ticket));
    return ticket;
  } catch (e) {
    console.error(e);
  }
  return null;
};

export const getTicketFromStorage = async (): Promise<Ticket | undefined> => {
  const ticket = await AsyncStorage.getItem('sd_ticket');

  if (ticket) {
    return JSON.parse(ticket);
  }
};

export const getTicketFromApi = (ticketHash: string): Promise<any> => {
  return fetch(`https://ticketing.fos.be/api/ticket?hash=${ticketHash}`, {
    method: 'GET',
  }).then((res) => res.json());
};
