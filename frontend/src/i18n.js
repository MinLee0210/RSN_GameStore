import i18n from "i18next";
import Backend from 'i18next-http-backend'
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)    
    .init({
        lng: 'en',
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false
        }
})