import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchGameList } from '../firebase';
import { LocaleLang } from '../locales';
import { AppContext } from './AppContext';

type Props = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
  const {
    i18n: { resolvedLanguage },
  } = useTranslation();
  const [localeLang, setLocaleLang] = useState<`${LocaleLang}`>(resolvedLanguage as LocaleLang);

  const { gameList, loading } = useFetchGameList();

  return (
    <AppContext.Provider value={{ gameList, gameListLoading: loading, localeLang, setLocaleLang }}>
      {children}
    </AppContext.Provider>
  );
};
