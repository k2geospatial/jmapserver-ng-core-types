declare interface JUserEventSessionChangedParams {
  session: JSessionData
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
  user: JUserPublicData
}

declare interface JUserPublicData {
  username: string
  fullName: string
  email: string
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
