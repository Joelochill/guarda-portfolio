import { translations } from './translations.js';

export function useTranslations(lang) {
  return function t(keys) {
    return (
      keys.split('.').reduce((acc, k) => acc?.[k], translations[lang]) ??
      keys
        .split('.')
        .reduce((acc, k) => acc?.[k], translations[translations.defaultLang]) ??
      keys
    );
  };
}
