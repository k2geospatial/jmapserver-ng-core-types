declare type JServerType = "legacy" | "saas"
declare type JServerSaasStatus = "STARTING" | "UP" | "DOWN" 
declare type JServerIdentityProviderType = "sso" | "auth0"

declare interface JServerIdentityProviderById { 
  [ id: string ]: JServerIdentityProvider 
} 

declare interface JServerInfo {
  identityProviderById: JServerIdentityProviderById
  standardLoginAvailable: boolean
  version: JServerVersion
  type: JServerType
  saasStatus?: JServerSaasStatus
  saasServices?: JServerSaasService[]
}

declare interface JServerSaasService {
  id: string
  name: string
  version: string
  status: JServerSaasStatus
  restBaseUrl: string
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
