import { IOrderable } from './IOrderable';

export interface ContentMetadata {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  lastUpdated: Date;
}

export const createMetadata = (
  content: IOrderable[] | IOrderable,
  key: string,
): ContentMetadata => {
  return {
    key,
    content,
    lastUpdated: new Date(),
  };
};
