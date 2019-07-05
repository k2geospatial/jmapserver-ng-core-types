declare namespace JMap.Service.MouseOver {
  function renderForFeaturesAtLocation(containerId: string, location: JLocation): boolean // return true if has mouseover
  function renderForFeaturesSelection(containerId: string, selection: JMapSelection): boolean // return true if has mouseover
  function getMouseOverContent(selection: JMapSelection): JMouseOverContent | undefined
  function processJSAndPhotosForContent(content: JMouseOverContent): void
}

declare interface JMapMouseOver {
  text: string | null
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
