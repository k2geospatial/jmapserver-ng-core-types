declare interface JSessionData {
  /**
   * The session token
   */
  token: string
  user: JUserPublicData
}

declare interface JUserPublicData {
  login: string,
  firstname: string,
  lastname: string,
  admin: boolean
}

declare interface JUserIdentity {
  firstName: string
  lastName: string
  login: string
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
