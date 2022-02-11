
declare type JMapContextVersion = 0 | 1
declare type JMapContextVersions = JMapContext | JMapContextV0 | JMapContextV1
declare type JMapContextTab = "list" | "create"
declare type JMapContextSortByOption = "alphabetic" | "lastUpdate" //  | "lastUse"
declare type JMapContextSortByDirection = "asc" | "desc"

declare interface JMapContextEditResponse {
  id: JId
  uuid: string
  modificationDate: string
}

declare interface JMapContextMetaData {
  title: string
  shareLink: boolean
  description?: string
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
  mapCenter: { x: number, y: number }
  mapZoom: number
  mapPitch: number
  mapBearing: number
  baseMap: string | undefined
  selection: {
    [ key in string | number ]: GeoJSON.Feature[]
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
  version: JMapContextVersion
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

declare interface JMapContextDataLayer extends JMapContextDataLayerElement{
  selectable: boolean
  thematics: JMapContextDataThematic[]
  dynamicFilterConditions: JDynamicFilterCondition[]
  dynamicFilterIsActive: boolean
}

declare interface JMapContextDataThematic {
  id: JId
  isVisible: boolean
}

declare interface JMapContext {
  id?: JId,
  title: string,
  description: string,
  shared: boolean,
  origin: "web-ng",
  uuid?: string,
  author?: string
  creationDate?: string
  modificationDate?: string
  projectId?: string
  data: JMapContextData
}

declare interface JMapContextV0 {
  id?: number | string,
  title: string,
  description: string,
  shared: boolean,
  origin: "web-ng",
  uuid?: string,
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
  // nothing else
}

declare interface JMapContextAfterApplyEventParams extends JMapContextEventParams  {
  // nothing else
}

declare interface JMapContextSetActiveResult {
  hasBeanInitialized: boolean
  hasLoadedDefault: boolean
  hasLoadedShared: boolean
  hasLoadingDefaultError?: boolean
  hasLoadingSharedError?: boolean
}
