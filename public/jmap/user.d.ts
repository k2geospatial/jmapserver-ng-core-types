declare namespace JMap.Service.User {
  function setSessionId(sessionId: string): void
  function login(login: string, password: string): Promise<JLoginData>
  function logout(): Promise<void>
}

declare interface JSessionData {
  sessionId: number
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

declare interface JUserPublicData {
  login: string,
  firstname: string,
  lastname: string,
  admin: boolean
}

declare interface JUserState {
  identity: JUserIdentity
  token: string
  locale: string
}

declare interface JUserIdentity {
  firstName: string
  lastName: string
  login: string
}
