import { ReactNode } from 'react';
import { useFetchGameList } from '../firebase';
import { AppContext } from './AppContext';

type Props = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
  const { gameList, loading } = useFetchGameList();

  return <AppContext.Provider value={{ gameList, gameListLoading: loading }}>{children}</AppContext.Provider>;
};
