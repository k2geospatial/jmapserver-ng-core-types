declare type JServerType = "legacy" | "saas"
declare type JServerSaasStatus = "STARTING" | "UP" | "DOWN" 
declare type JServerIdentityProviderType = "sso" | "auth0"

declare interface JServerIdentityProviderById { 
  [ id: string ]: JServerIdentityProvider 
} 

declare interface JServerInfo {
  identityProviderById: JServerIdentityProviderById
  standardLoginAvailable: boolean
  version: string
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
