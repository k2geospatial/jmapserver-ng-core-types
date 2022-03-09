declare interface JRequestConfig {
  url: string
  params?: { [key: string]: any } | string
  accessToken?: string // for jaaz only
  includeHeadersInResponse?: boolean
}