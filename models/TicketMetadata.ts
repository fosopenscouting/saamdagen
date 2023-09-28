import { IOrderable } from './IOrderable';

export interface TicketMetadata {
  key: string;
  content: any;
  lastUpdated: Date;
}

export const createMetadata = (
  content: IOrderable[] | IOrderable,
  key: string,
): TicketMetadata => {
  return {
    key,
    content,
    lastUpdated: new Date(),
  };
};
