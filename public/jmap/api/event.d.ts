declare interface JLayerEventParams {
  layer: JLayerTreeElement
}

declare interface JMapEventImplementationParams {
  implementation: MAP_IMPLEMENTATION,
  map: any
}

declare interface JMapEventParams {
  map: any,
  mapEvent: any
}

declare interface JMapEventLocationParams extends JMapEventParams {
  location: JLocation
}

declare interface JMapEventLayerParams extends JMapEventLocationParams {
  layerId: number
}

declare interface JMapEventFeaturesParams extends JMapEventLayerParams {
  features: any[]
}
