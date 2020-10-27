declare interface JLayerEventChangeParams {
  layerTree: JLayerTree
}

declare interface JLayerEventThematicVisibilityParams {
  layerId: number
  thematicId: number
  visibility: boolean
}

declare interface JLayerEventVisibilityParams {
  layerId: number
  visibility: boolean
  areAllParentsVisible: boolean
}

declare interface JLayerEventParams {
  layerId: number
}

declare interface JMapEventLoadedParams {
  map: any
}

declare interface JMapEventParams {
  map: any,
  mapEvent: any
}

declare interface JMapEventLocationParams extends JMapEventParams {
  location: JLocation
}

declare interface JMapEventZoomParams extends JMapEventParams {
  zoom: number
}

declare interface JMapEventRotateParams extends JMapEventParams {
  bearing: number
}

declare interface JMapEventPitchParams extends JMapEventParams {
  pitch: number
}

declare interface JMapEventLayerParams extends JMapEventLocationParams {
  layerId: number
}

declare interface JMapEventFeaturesParams extends JMapEventLayerParams {
  features: any[]
}

declare interface JUserEventSessionChangedParams {
  session: JSessionData
}
