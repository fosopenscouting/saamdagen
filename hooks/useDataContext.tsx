import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { ContentMetadata } from '../models/ContentMetadata';
import { IOrderable } from '../models/IOrderable';
import useRefresh from './useRefresh';

type DataContextType = {
  data: ContentMetadata[] | undefined;
  refreshing: boolean;
  refreshContext: () => Promise<void>;
};

const DataContext = React.createContext<DataContextType | undefined>(undefined);

type DataContextProviderProps = {
  children: ReactNode;
};

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}: DataContextProviderProps) => {
  const [data, setData] = useState<ContentMetadata[]>();

  const { refresh, refreshing } = useRefresh();

  const loadDataFromStorage = async () => {
    const dataFromStorage = await AsyncStorage.getItem('DATA');
    if (dataFromStorage) {
      const parsedData: ContentMetadata[] = JSON.parse(dataFromStorage);
      setData(parsedData);
    }
  };

  const refreshContext = async () => {
    await refresh();
    await loadDataFromStorage();
    console.log('loaded');
  };
  useEffect(() => {
    const asyncWrap = async () => {
      await loadDataFromStorage();
    };
    asyncWrap();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        refreshing,
        refreshContext,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      'useDataContext must be used within an DataContextProvider',
    );
  }
  return context;
};
