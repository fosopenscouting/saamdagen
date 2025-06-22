import { IOrderable } from './IOrderable';
import { Notification } from './Notification';

export interface ContentMetadata<T = any> {
  key: string;

  content: T;
  lastUpdated: Date;
}

export const createMetadata = (
  content: IOrderable[] | IOrderable | Notification[],
  key: string,
): ContentMetadata => {
  return {
    key,
    content,
    lastUpdated: new Date(),
  };
};
