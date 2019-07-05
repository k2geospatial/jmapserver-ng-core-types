declare type MAP_IMPLEMENTATION = "MapBox" | "OpenLayers"

declare interface JMapInteractorDescriptor {
  id: string
  apiMode: API_MODE
  isExternal: boolean
}

declare interface JMapInteractor {
  init(map: any): void
  activate(): void
  deactivate(): void
  terminate(): void
}

declare interface JMapSelection {
  [ layerId: number ]: any[] // any = feature
}

declare interface JMapLayersVisibilityStatus {
  [ layerElementId: number ]: {
    isVisible: boolean
    userVisibility: boolean
    mapVisibility: boolean
  }
}

declare interface JProjection {
  code: string
  name: string
}

declare interface JMapFeatureAttributeValues {
  featureId: number
  [ attributeId: string ]: any
}
