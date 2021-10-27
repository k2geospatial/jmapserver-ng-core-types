declare type JServerType = "legacy" | "saas"
declare type JServerSaasStatus = "STARTING" | "UP" | "DOWN" 
declare type JServerIdentityProviderType = "sso" | "auth0-spa" | "jaaz.io"

declare interface JServerIdentityProviderById { 
  [ id: string ]: JServerAnyIdentityProvider 
} 

declare interface JServerSaasServiceById {
  [ id: string ]: JServerSaasService
}

declare interface JServerInfo {
  identityProviderById: JServerIdentityProviderById
  standardLoginAvailable: boolean
  version: JServerVersion
  type: JServerType
  saasServiceById?: JServerSaasServiceById
}

declare interface JServerSaasService {
  id: string
  name: string
  version: string
  status: JServerSaasStatus
  restBaseUrl: string
}

declare type JServerAnyIdentityProvider = JServerIdentityProviderJaazNative | JServerIdentityProviderAuth0Password | JServerIdentityProviderSso

declare interface JServerIdentityProviderBase {
  id: string
  name: string
  type: JServerIdentityProviderType
}

declare interface JServerIdentityProviderJaazNative extends JServerIdentityProviderBase {
  type: "jaaz.io"
}

declare interface JServerIdentityProviderAuth0Password extends JServerIdentityProviderBase {
  type: "auth0-spa"
  domain: string
  clientId: string
  realm: string
}

declare interface JServerIdentityProviderSso extends JServerIdentityProviderBase {
  type: "sso"
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
