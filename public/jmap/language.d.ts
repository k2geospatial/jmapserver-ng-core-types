declare type JLocale = "fr" | "en" 

declare interface JLocaleTranslation {    
  [key: string]: string
}

declare interface JTranslationItem{
  key: string
  bundleId: string
}

interface JTranslateParams extends JTranslationItem {
  params?: string | string[] | number | number[]
  locale?: JLocale
}

declare interface JTranslationsByLocale {
  [locale: string]: JLocaleTranslation
}

declare interface JTranslationBundle {
  id: string
  translationsByLocale: JTranslationsByLocale
  defaultLocale?: JLocale
}

declare interface JTranslationBundleById {
  [bundleId: string]: JTranslationBundle
}

declare interface JLanguageEventLocaleChangeParams {
  locale: JLocale
}
