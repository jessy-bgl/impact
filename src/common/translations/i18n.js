import * as i18n from "i18next";
import { initReactI18next } from "react-i18next";

import * as fr from "./fr";

const resources = { fr };

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
