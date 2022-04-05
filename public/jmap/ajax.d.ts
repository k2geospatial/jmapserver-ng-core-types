declare interface JRequestConfig {
  /**
   * The url to request.
   */
  url: string
  /**
   * Body params, that will be passed in the request.
   */
  params?: { [key: string]: any } | string
  /**
   * For request on Jaaz serveur only.
   */
  accessToken?: string
  /**
   * If true will return the header in the response.
   */
  includeHeadersInResponse?: boolean
  /**
   * If true will ignore the authorization headers.
   */
  ignoreJMapAuthorizationHeaderParam?: boolean
  /**
   * To specify custom headers that you might want to use for external ressources.
   */
  headers?: { [key: string]: any }
}
