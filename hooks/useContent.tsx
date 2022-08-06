import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React from 'react';
import { IOrderable } from '../models/IOrderable';

export const useContent = <TInput extends IOrderable>(
  contentKey: string,
): TInput[] | undefined => {
  const [content, setContent] = React.useState<TInput[]>();

  React.useEffect(() => {
    AsyncStorageLib.getItem(contentKey).then((items) => {
      if (items) {
        let parsed = JSON.parse(items) as TInput[];
        parsed = parsed.sort(sortByOrder);
        setContent(parsed);
      }
    });
  }, []);

  return content;
};

const sortByOrder = (x: IOrderable, y: IOrderable) => {
  return x.order - y.order;
};
