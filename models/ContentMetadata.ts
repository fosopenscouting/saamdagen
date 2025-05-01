import { IOrderable } from './IOrderable';
import { Notification } from './Notification';

export interface ContentMetadata<T = any> {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
