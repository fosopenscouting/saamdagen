import { IOrderable } from './IOrderable';

export interface ContentMetadata {
  key: string;
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
