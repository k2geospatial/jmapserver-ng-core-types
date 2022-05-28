declare interface JUserEventSessionChangedParams {
  session: JSessionData
}

declare interface JUserEventOrganizationChangedParams {
  organization: JOrganization
}

declare interface JSessionData {
  /**
   * The JMap user session token.
   */
  token: string
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
  externalApiKeys: JExternalApiKey[]
}

declare interface JExternalApiKey {
  id: string
  title: string
  apiKey: string
  type: JEXTERNAL_API_KEY_TYPES
}

// ALL_JEXTERNAL_API_KEY_TYPES in all-enum.ts
declare const enum JEXTERNAL_API_KEY_TYPES {
  MAPBOX_ACCESS_TOKEN = "MAPBOX_ACCESS_TOKEN"
}
