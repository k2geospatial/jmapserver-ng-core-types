declare interface Window {
  JMAP_API_OPTIONS?: JAPIOptions
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

declare interface JAPIOptions {
  projectId?: number
  restBaseUrl?: string
  noSessionExpiration: boolean
  session?: JSessionData
  application?: JAPIApplicationOptions
  map?: JAPIMapOptions
}

declare interface JAPIMapOptions {
  containerId?: string
  implementation?: MAP_IMPLEMENTATION
  mapboxToken?: ""
  scalePanelVisible?: boolean
  scalePanelUnit?: "imperial" |  "metric" |  "nautical"
  center?: JLocation
  zoom?: number
  onStartupMapReadyFn?: (map: any) => {}
}

declare interface JAPIApplicationOptions {
  start: boolean
  containerId: string
}