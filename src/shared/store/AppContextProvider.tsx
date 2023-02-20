import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchGameList } from '../firebase';
import { Lang } from '../locales';
import { AppContext } from './AppContext';

type Props = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
  const {
    i18n: { resolvedLanguage },
  } = useTranslation();
  const [lang, setLang] = useState<`${Lang}`>(resolvedLanguage as Lang);

  const { gameList, loading } = useFetchGameList();

  return (
    <AppContext.Provider value={{ gameList, gameListLoading: loading, lang, setLang }}>{children}</AppContext.Provider>
  );
};
