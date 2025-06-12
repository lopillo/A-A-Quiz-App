import * as Localization from 'expo-localization';
import en from './en.json';
import es from './es.json';
import de from './de.json';

export type TranslationKey = keyof typeof en;

type Dictionaries = Record<string, Record<TranslationKey, string>>;

const dictionaries: Dictionaries = {
  en,
  es,
  de,
};

// If `Localization.locale` is undefined (for example during tests), default to English.
const defaultLocale = Localization.locale?.split('-')[0] ?? 'en';

let locale = defaultLocale;

export const setLocale = (lang: string) => {
  locale = lang;
};

export const getLocale = () => locale;

export function t(key: TranslationKey, options?: Record<string, string | number>): string {
  const dict = dictionaries[locale] || dictionaries.en;
  let text = dict[key] || key;
  if (options) {
    Object.keys(options).forEach((k) => {
      text = text.replace(`{{${k}}}`, String(options[k]));
    });
  }
  return text;
}

export const availableLanguages = Object.keys(dictionaries);
