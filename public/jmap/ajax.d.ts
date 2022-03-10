declare interface JRequestConfig {
  url: string // The url to request.
  params?: { [key: string]: any } | string // Body params, that will be passed in the request.
  accessToken?: string // For request on Jaaz serveur only.
  includeHeadersInResponse?: boolean // If true will return the header in the response.
}
