declare interface JUserEventSessionChangedParams {
  session: JSessionData
}

declare interface JTokenInfo {
  /**
   * The JMap user session token (legacy) or auth0 access token (Saas JMap Cloud).
   */
  accessToken: string
  /**
   * The auth0 refresh token.
   */
  refreshToken: string
  /**
   * The auth0 access token expiration time in seconds.
   */
  accessTokenExpiration: number
}

declare interface JSessionData extends JTokenInfo {
  /**
   * The user permission to change his password
   */
  changePasswordAllowed: boolean
  /**
   * The user information.
   *
   * @example ```ts
   *
   * user: {
   *   username: "jdo@company.com",
   *   fullName: "John Do",
   *   admin: true
   * }
   * ```
   */
  user: JUserIdentity
  /**
   * THe JMap Cloud organization, only for JMap Cloud servers.
   */
  organization: JOrganization
}

declare interface JUserIdentity {
  username: string
  fullName: string
  email: string
}

declare interface JUserInfo {
  id: string
  label: string
  value: undefined | null | string | number | Date
}

declare interface JOrganization {
  id: string
  name: string
  description: string
  active: boolean
  externalApiKeys: JOrganizationExternalApiKey[]
}

declare interface JOrganizationExternalApiKey {
  id: string
  title: string
  apiKey: string
  type: JORGANIZATION_EXTERNAL_API_KEY_TYPES
}

// ALL_JORGANIZATION_EXTERNAL_API_KEY_TYPES in all-enum.ts
declare const enum JORGANIZATION_EXTERNAL_API_KEY_TYPES {
  MAPBOX_ACCESS_TOKEN = "MAPBOX_ACCESS_TOKEN"
}
