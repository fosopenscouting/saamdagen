import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React from 'react';
import { ContentMetadata } from '../models/ContentMetadata';
import { IOrderable } from '../models/IOrderable';

export const useContent = <TInput extends IOrderable>(
  contentKey: string,
): [TInput[] | undefined, Date | undefined] => {
  const [content, setContent] = React.useState<TInput[]>();
  const [lastUpdated, setLastUpdated] = React.useState<Date>();

  React.useEffect(() => {
    AsyncStorageLib.getItem(contentKey).then((items) => {
      if (items) {
        const parsed = JSON.parse(items) as ContentMetadata;
        const content = parsed.content.sort(sortByOrder);
        setContent(content);
        setLastUpdated(parsed.lastUpdated);
      }
    });
  }, []);

  return [content, lastUpdated];
};

const sortByOrder = (x: IOrderable, y: IOrderable) => {
  return x.order - y.order;
};
