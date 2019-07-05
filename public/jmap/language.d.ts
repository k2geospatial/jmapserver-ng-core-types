declare namespace JMap.Service.Language {
  function getLocale(): string // EN (default), FR, ES, or PT
  function translate(key: string, params?: string | string[], locale?: string): string
}
