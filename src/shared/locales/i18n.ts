import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations from './translations';
import { LocaleLang } from './types';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: LocaleLang.CS,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: translations,
  });

export { i18n };
