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

declare interface JMouseOverOpenPopupParams{
  location: JLocation
  html: string
  toEvalJS?: string[]
  panToLocation?: boolean
}

declare interface JMouseOverOpenPopupForSelectionParams{
  selection: JMapSelection 
  location?: JLocation 
  panToLocation?: boolean
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

declare interface JMouseOverContentEventParams extends JMouseOverSelectionParams {
  // if called will stop the current mouse over to be displayed
  cancelMouseOver(): void
}

declare interface JMouseOverBeforeEventParams extends JMouseOverContentEventParams {
  addFeaturesToLayerSelection(layerId: JId, features: GeoJSON.Feature[]): void
  removeFeaturesFromLayerSelection(layerId: JId, featureIds: string[]): void
  getFeaturesByLayerId(layerId: JId): GeoJSON.Feature[]
  // you can add some html at the beginning of the mouseover
  addHtmlContentAtTheBeginning(html: string): void
  // you can add some html at the end of the mouseover
  addHtmlContentAtTheEnd(html: string): void
  // by default html content added at the beginning or the end are displayed only if a mouseover is found.
  // By calling this method it will display even if no mouseover found
  displayHtmlContentEvenIfNoMouseOver(): void
}

declare interface JMouseOverAfterEventParams extends JMouseOverContentEventParams, JMouseOverEventParams {
  // nothing to add
}
