declare type JServerType = "legacy" | "saas"
declare type JServerIdentityProviderType = "sso"

declare interface JServerIdentityProviderById { 
  [ id: string ]: JServerIdentityProvider 
} 

declare interface JServerInfo {
  identityProviderById: JServerIdentityProviderById
  standardLoginAvailable: boolean
  version: JServerVersion
  type: JServerType
}

declare interface JServerIdentityProvider {
  id: string
  type: JServerIdentityProviderType
  name: string
  imageData: string
  loginUrl: string
}

declare interface JServerVersion {
  title: string
  mainVersion: number
  buildNumber: number
}

declare interface JMinimumServerVersion {
  legacy: JServerVersion
  saas: JServerVersion
}

declare interface JServerInfoReadyEventParams {
  serverInfo: JServerInfo
  isMinimumVersionRespected: boolean
}
