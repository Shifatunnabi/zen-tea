'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'bn' | 'ar'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (translations: TranslationObject) => string
}

export type TranslationObject = {
  en: string
  bn?: string
  ar?: string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  // Load saved language preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('zen-tea-language') as Language
    if (saved && ['en', 'bn', 'ar'].includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  // Save language preference
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('zen-tea-language', lang)
    
    // Update HTML lang and dir attributes
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  // Translation function with English fallback
  const t = (translations: TranslationObject): string => {
    return translations[language] || translations.en
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
