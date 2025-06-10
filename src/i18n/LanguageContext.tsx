import React, { createContext, useContext, useState } from 'react';
import * as Localization from 'expo-localization';
import { setLocale, getLocale } from './index';

export type LanguageContextValue = {
  language: string;
  setLanguage: (lang: string) => void;
};

const defaultLang = Localization.locale.split('-')[0];

const LanguageContext = createContext<LanguageContextValue>({
  language: defaultLang,
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(getLocale());

  const update = (lang: string) => {
    setLanguageState(lang);
    setLocale(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: update }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
