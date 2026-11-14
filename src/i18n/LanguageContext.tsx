import React, { createContext, useContext, useEffect, useState } from 'react';
import { LanguageCode, TRANSLATIONS, TranslationPack } from './translations';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationPack;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  t: TRANSLATIONS.en,
  isRtl: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kelvix-lang');
        if (saved === 'en' || saved === 'de' || saved === 'ar') {
          return saved;
        }
      } catch {
        // Ignore storage restriction
      }
    }
    return 'en';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('kelvix-lang', language);
    } catch {
      // Ignore storage restriction
    }
  }, [language]);

  const setLanguage = (next: LanguageCode) => {
    setLanguageState(next);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
        isRtl: language === 'ar',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  return useContext(LanguageContext);
}
