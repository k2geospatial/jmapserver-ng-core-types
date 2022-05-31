// ALL_SERVER_TYPES in all-enum.ts
declare const enum JSERVER_TYPES {
  LEGACY = "legacy",
  SAAS = "saas"
}

// ALL_SERVER_SAAS_STATUS in all-enum.ts
declare const enum JSERVER_SAAS_STATUS {
  STARTING = "STARTING",
  UP = "UP",
  DOWN = "DOWN"
}

// ALL_SERVER_SAAS_STATUS in all-enum.ts
declare const enum JSERVER_IDENTITY_PROVIDER_TYPES {
  SSO = "sso",
  AUTH0_SPA = "auth0-spa",
  JMAP_CLOUD = "jmapcloud.io"
}

declare interface JServerIdentityProviderById {
  [id: string]: JServerAnyIdentityProvider
}

declare interface JServerSaasServiceById {
  [id: string]: JServerSaasService
}

declare interface JServerInfo {
  identityProviderById: JServerIdentityProviderById
  standardLoginAvailable: boolean
  version: JServerVersion
  type: JSERVER_TYPES
  saasServiceById?: JServerSaasServiceById
}

declare interface JServerSaasService {
  id: string
  name: string
  version: string
  status: JSERVER_SAAS_STATUS
  restBaseUrl: string
}

declare type JServerAnyIdentityProvider =
  | JServerIdentityProviderJMapCloudNative
  | JServerIdentityProviderAuth0Password
  | JServerIdentityProviderSso

declare interface JServerIdentityProviderBase {
  id: string
  name: string
  type: JSERVER_IDENTITY_PROVIDER_TYPES
}

declare interface JServerIdentityProviderJMapCloudNative extends JServerIdentityProviderBase {
  type: JSERVER_IDENTITY_PROVIDER_TYPES.JMAP_CLOUD
}

declare interface JServerIdentityProviderAuth0Password extends JServerIdentityProviderBase {
  type: JSERVER_IDENTITY_PROVIDER_TYPES.AUTH0_SPA
  domain: string
  clientId: string
  realm: string
}

declare interface JServerIdentityProviderSso extends JServerIdentityProviderBase {
  type: JSERVER_IDENTITY_PROVIDER_TYPES.SSO
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
