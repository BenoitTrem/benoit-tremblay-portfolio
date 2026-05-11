import en from "../locales/en.json";
import fr from "../locales/fr.json";

const translations = { en, fr };

export type Locale = "en" | "fr";
export type Translations = typeof en;

export function getT(locale: Locale): Translations {
  return translations[locale] ?? translations.en;
}
