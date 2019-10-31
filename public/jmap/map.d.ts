declare type MAP_IMPLEMENTATION = "MapBox" | "OpenLayers"

declare interface JMapInteractor {
  init(map: any): void
  activate(): void
  desactive(): void
  terminate(): void
}

declare interface JMapSelection {
  [ layerId: number ]: any[] // any = feature
}

declare interface JMapLayerVisibilityStatus {
  layerId: number
  layerName: string
  isRendered: boolean
  visibilityProperty: boolean
  parentVisibility: boolean
  scaleVisibility: boolean
  extentVisibility: boolean
}

declare interface JMapLayersVisibilityStatus {
  [ layerElementId: number ]: JMapLayerVisibilityStatus
}

declare interface JProjection {
  code: string
  name: string
}

declare interface JMapFeatureAttributeValues {
  featureId: number
  [ attributeId: string ]: any
}
