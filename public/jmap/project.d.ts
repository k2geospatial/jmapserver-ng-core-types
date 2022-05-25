declare interface JProjectLoadThumbnailsParams {
  width: number
  height: number
}

declare interface JProjectEventParams {
  project: JProject
}

declare interface JProjectAllEventParams {
  projects: JProject[]
}

declare interface JProjectServerExtension {
  id: string
  name: string
  jsUrl: string
  data: any | null
  version: string
}

declare interface JProject {
  id: JId //TODO: refactoring will be done in JWNG-351
  name: string
  description: string
  projection: JProjection
  initialRotation: number
  colorSelection: string
  colorBackground: string
  initialExtent: JBounds | null
  mapUnit: JMAP_DISTANCE_UNITS
  apiKey: {
    google: string | null
    bing: string | null
    mapBox: string | null
  }
  queryGroups: JQueryGroup[]
  defaultDistanceUnit: JMAP_DISTANCE_UNITS
  base64ImageThumbnail: string
  extensions: JProjectServerExtension[]
  usageStatisticsActive: boolean
}
