import { createContext, useContext } from "react";
import type { Locale } from "./translations";

export const LocaleContext = createContext<Locale>("en");
export const useLocale = () => useContext(LocaleContext);
