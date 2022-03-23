// ALL_LOCALES in all-enum.ts
declare const enum JLOCALES {
  FR = "fr",
  EN = "en",
  ES = "es"
}

declare interface JLocaleTranslation {
  [key: string]: string
}

declare interface JTranslationItem {
  key: string
  bundleId: string
}

interface JTranslateParams extends JTranslationItem {
  params?: (string | number) | Array<string | number>
  locale?: JLOCALES
}

declare interface JTranslationsByLocale {
  [locale: string]: JLocaleTranslation
}

declare interface JTranslationBundle {
  id: string
  translationsByLocale: JTranslationsByLocale
  defaultLocale?: JLOCALES
}

declare interface JTranslationBundleById {
  [bundleId: string]: JTranslationBundle
}

declare interface JLanguageEventLocaleChangeParams {
  locale: JLOCALES
}
