import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';
import Cookies from 'js-cookie';

const language = Cookies.get('i18next') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
  },
  lng: language,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react
  },
});

export default i18n;
