declare interface JMapMouseOver {
  text: string
  preventTextDuplication: boolean
  backgroundColor: string
  visible: boolean
  maximumVisibleMapboxZoom: number
  minimumVisibleMapboxZoom: number
}

declare interface JMouseOverContent {
  html: string
  photoFeatureIdsByLayerId: { [ layerId: number ]: number[] }
  toEvalJS: string[]
}

declare interface JMouseOverSelectionParams {
  selection: JMapSelection
  popup: mapboxgl.Popup
  map: mapboxgl.Map | undefined
  location: JLocation
}

declare interface JMouseOverEventParams {
  content: JMouseOverContent
}

declare interface JMouseOverBeforeEventParams extends JMouseOverSelectionParams {
  addFeaturesToLayerSelection(layerId: JId, features: GeoJSON.Feature[]): void
  removeFeaturesFromLayerSelection(layerId: JId, featureIds: string[]): void
  getFeaturesByLayerId(layerId: JId): GeoJSON.Feature[]
}
