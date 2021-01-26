declare type JLocale = "fr" | "en" | "es" | "pt"

declare interface JLocaleTranslation {    
  [key: string]: string
}

declare interface JTranslationsByLocale {
  [locale: string]: JLocaleTranslation
}

declare interface JTranslationBundle {
  id: string
  defaultLocale: JLocale
  translationsByLocale: JTranslationsByLocale
}

declare interface JTranslationBundleById {
  [bundleId: string]: JTranslationBundle
}
