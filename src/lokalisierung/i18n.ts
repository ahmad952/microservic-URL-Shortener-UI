import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Ihre Übersetzungsressourcen
const resources = {
  en: {
    translation: {
        "input": "Input",
        "output": "Output",
        "copy": "Copy",
        "execute": "Execute",
        "shorten": "Shorten",
        "language": "En",
        "add": "Add data",
        "createdDate": "createdDate",
        "modifiedDate": "modifiedDate",
        "Actions":"Actions",
        "enterUrl":"Please enter the URL:",
        "enterID": "Please enter the ID:"


    }

  },
  de: {
    translation: {
        "input": "Eingeben",
        "output": "Ausgabe",
        "copy": "Kopieren",
        "execute": "Ausführen",
        "shorten": "Verkürzen",
        "language": "De",
        "add": "Daten hinzufügen",
        "createdDate": "Erstellungsdatum",
        "modifiedDate": "Änderungsdatum",
        "Actions":"Aktionen",
        "enterUrl":"Bitte geben Sie die URL ein:",
        "enterID": "Bitte geben Sie die ID ein:"

    },
    
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de', 
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;