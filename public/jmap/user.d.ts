declare interface JSessionData {
  /**
   * The JMap user session token.
   */
  token: string
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
  admin: boolean
}

declare interface JUserIdentity {
  username: string
  fullName: string
  email: string
}

declare interface JLoginData {
  token: string
  user: JUserPublicData
}

declare interface JUserState {
  identity: JUserIdentity
  token: string
  locale: string
}
