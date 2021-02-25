declare interface JServerIdentityProviderById { 
  [ id: string ]: JServerIdentityProvider 
} 

declare interface JServerInfo {
  identityProviderById: JServerIdentityProviderById
  standardLoginAvailable: boolean
  version: string
}

declare interface JServerIdentityProvider {
  id: string
  type: JServerIdentityProviderType
  name: string
  imageData: string
  loginUrl: string
}

declare type JServerIdentityProviderType = "sso" 
