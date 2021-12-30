// jest-dom adds custom jest matchers for asserting on DOM nodes.
// Allows you to do things like: expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// Configure react-i18next to use English translations in tests.
// More info: https://react.i18next.com/misc/testing
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const I18N_DIR = "../public/locales/en";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: "common",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      appid: require(`${I18N_DIR}/appid.json`),
      common: require(`${I18N_DIR}/common.json`),
      navigation: require(`${I18N_DIR}/navigation.json`),
    },
  },
});
