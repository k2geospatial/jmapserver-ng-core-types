declare interface JUserEventSessionChangedParams {
  session: JSessionData
}

declare interface JTokenInfo {
  /**
   * The JMap user session token (legacy) or access token (Saas JMap Cloud).
   */
  accessToken: string
  /**
   * The access token expiration time in seconds.
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
   * Infos about the user's organizations, only for JMap Cloud servers.
   */
  organizationInfos: JOrganizationInfo[]
  /**
   * THe JMap Cloud organization in which the user is currently logged in, only for JMap Cloud servers.
   */
  currentOrganization: JOrganization
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

declare interface JOrganizationInfo {
  id: string
  auth0Id: string
  name: string
  logoUrl: string
  primaryColor: string
  backgroundColor: string
  active: boolean
}

declare interface JOrganization extends JOrganizationInfo {
  externalApiKeys: JOrganizationExternalApiKey[]
  enabledExtensions: JProjectServerExtension[]
}

declare interface JOrganizationExternalApiKey {
  id: string
  title: string
  apiKey: string
  type: JORGANIZATION_EXTERNAL_API_KEY_TYPES
}

declare interface JJMapPasswordPolicyCompliance {
  hasMinimumLength: boolean
}

// ALL_JORGANIZATION_EXTERNAL_API_KEY_TYPES in all-enum.ts
declare const enum JORGANIZATION_EXTERNAL_API_KEY_TYPES {
  MAPBOX_ACCESS_TOKEN = "MAPBOX_ACCESS_TOKEN"
}
