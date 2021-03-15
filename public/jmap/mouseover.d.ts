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
