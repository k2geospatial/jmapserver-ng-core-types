declare interface JMapMouseOver {
  text: string
  preventTextDuplication: boolean
  backgroundColor: string
  visible: boolean
  minimumScale: number
  maximumScale: number
}

declare interface JMouseOverContent {
  html: string
  photoFeatureIdsByLayerId: { [ layerId: number ]: number[] }
  toEvalJS: string[]
}
