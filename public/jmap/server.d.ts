declare type JServerType = "legacy" | "saas"

declare interface JServerIdentityProviderById { 
  [ id: string ]: JServerIdentityProvider 
} 

declare interface JServerInfo {
  identityProviderById: JServerIdentityProviderById
  standardLoginAvailable: boolean
  version: string
  type: JServerType
}

declare interface JServerIdentityProvider {
  id: string
  type: JServerIdentityProviderType
  name: string
  imageData: string
  loginUrl: string
}

declare type JServerIdentityProviderType = "sso" 
