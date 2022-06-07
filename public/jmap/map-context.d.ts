// ALL_MAP_CONTEXT_APPLY_TYPES in all-enum.ts
declare const enum JMAP_CONTEXT_APPLY_TYPES {
  STANDARD = "standard",
  DEFAULT = "default",
  SHARED = "shared"
}

// ALL_MAP_CONTEXT_TAB in all-enum.ts
declare const enum JMAP_CONTEXT_TABS {
  LIST = "list",
  CREATE = "create"
}

// ALL_MAP_CONTEXT_SORT_BY_OPTIONS in all-enum.ts
declare const enum JMAP_CONTEXT_SORT_BY_OPTIONS {
  ALPHABETIC = "alphabetic",
  LAST_UPDATE = "lastUpdate"
}

// ALL_MAP_CONTEXT_SORT_BY_DIRECTIONS in all-enum.ts
declare const enum JMAP_CONTEXT_SORT_BY_DIRECTIONS {
  ASC = "asc",
  DESC = "desc"
}

// ALL_MAP_CONTEXT_VERSIONS in all-enum.ts
declare const enum JMAP_CONTEXT_VERSIONS {
  V0 = 0,
  V1 = 1
}

declare type JMapContextVersions = JMapContext | JMapContextV0 | JMapContextV1

declare interface JMapContextEditResponse {
  id: JId
  uuid: string
  modificationDate: string
}

declare interface JMapContextMetaData {
  title?: string
  shareLink?: boolean
  description?: string
  thumbnailUrl?: string
}

/**
 * Never change this interface !!!
 * This is the picture of a map-context in version 0
 * Use for mapcontext migrations
 */
declare interface JMapContextDataV0 {
  layerElements: Array<{
    id: string | number
    isGroup: boolean
    isVisible: boolean
  }>
  mapCenter: { x: number; y: number }
  mapZoom: number
  mapPitch: number
  mapBearing: number
  baseMap: string | undefined
  selection: {
    [key in string | number]: GeoJSON.Feature[]
  }
  measures: Array<{
    id: string
    type: "polygon" | "line_string" | "circle"
    feature: GeoJSON.Feature<GeoJSON.LineString | GeoJSON.Polygon>
    totalEdges: number
    centroid: JPoint
    edges: Array<{
      popupLocation: JPoint
      distance: number
    }>
    area: number
    radius: number
  }>
  thumbnail: string
  annotations: Array<{
    id: string
    type: "point" | "polygon" | "line_string" | "rectangle" | "circle" | "text"
    feature: any
  }>
  annotationsTextMarkersProperties: Array<{
    id: string
    location: mapboxgl.LngLatLike
    textSize: number
    textColor: string
    textRotation: number
    label: string
    zoomRef: number
    shapeType: string
  }>
  extensionData?: { [extensionId: string]: any }
}

declare interface JMapContextData {
  version: JMAP_CONTEXT_VERSIONS
  layerElements: JMapContextDataLayerElement[]
  mapCenter: JLocation
  mapZoom: number
  mapPitch: number
  mapBearing: number
  baseMap: string | undefined
  selection: JMapSelection
  thumbnailUrl: string
  extensionData: { [extensionId: string]: any }
}

declare interface JMapContextDataLayerElement {
  id: JId
  isGroup: boolean
  isVisible: boolean
}

declare interface JMapContextDataLayer extends JMapContextDataLayerElement {
  selectable: boolean
  thematics: JMapContextDataThematic[]
  dynamicFilterConditions: JDynamicFilterCondition[]
  dynamicFilterIsActive: boolean
  transparency?: number
}

declare interface JMapContextDataThematic {
  id: JId
  isVisible: boolean
}

declare interface JMapContext {
  id?: JId
  title: string
  description: string
  shared: boolean
  origin: "web-ng"
  uuid?: string
  author?: string
  creationDate?: string
  modificationDate?: string
  projectId?: string
  data: JMapContextData
}

declare interface JMapContextV0 {
  id?: number | string
  title: string
  description: string
  shared: boolean
  origin: "web-ng"
  uuid?: string
  author?: string
  creationDate?: string
  modificationDate?: string
  projectId?: string
  data: JMapContextDataV0
}

declare interface JMapContextV1 extends JMapContext {
  // nothing to change here
}

declare interface JMapContextEventParams {
  context: JMapContext
  isExtensionDataSetById(extensionId: string): boolean
  getExtensionDataById(extensionId: string): any
}

declare interface JMapContextMapDataEventParams extends JMapContextEventParams {
  isCreation: boolean
}

declare interface JMapContextBeforeMapDataChangeEventParams extends JMapContextMapDataEventParams {
  setExtensionDataById(extensionId: string, data: any): void
  removeExtensionDataById(extensionId: string): void
}

declare interface JMapContextAfterMapDataChangeEventParams extends JMapContextMapDataEventParams {
  // nothing else
}

declare interface JMapContextBeforeApplyEventParams extends JMapContextEventParams {
  applyType: JMAP_CONTEXT_APPLY_TYPES
}

declare interface JMapContextAfterApplyEventParams extends JMapContextEventParams {
  applyType: JMAP_CONTEXT_APPLY_TYPES
}

declare interface JMapContextSetActiveResult {
  hasBeanInitialized: boolean
  hasLoadedDefault: boolean
  hasLoadedShared: boolean
  hasLoadingDefaultError?: boolean
  hasLoadingSharedError?: boolean
}
