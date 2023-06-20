import {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { getTicketFromStorage } from '../../services/TicketService';
import { Ticket } from '../../models/Ticket';

export const TicketContext = createContext({
  Ticket: {
    firstName: '',
    lastName: '',
    ticketType: '',
    workshopBeforeNoon: '',
    hash: '',
  },
});
export const useTicket = () => useContext(TicketContext);

export const TicketProvider = () => {
  const [ticketData, setTicketData] = useState<Ticket | null | undefined>();

  const getTickets = useCallback(async () => {
    const ticket = await getTicketFromStorage();
    setTicketData(ticket);
  }, []);
  getTickets();
  const value: any = useMemo(
    () => ({
      ticketData,
    }),
    [ticketData],
  );
  return <TicketContext.Provider value={value}></TicketContext.Provider>;
};
