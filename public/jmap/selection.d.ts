declare interface JElementSelection {
  [layerId: number]: number[]
}

declare interface JElementSelectionWithAttribute {
  attributeName: string
  layerName: string
  elementIds: string[]
}

declare interface JSelectionSetLayersSelectionParams{
  layerId: JId
  features: GeoJSON.Feature[]
}

declare interface JMapSelectionParams {
  /**
   * true by default.
   * If new selection select a feature that is already selected,
   * if parameter is true it will deselect the feature,
   * else will let the feature selected.
   */
  toggleSelection?: boolean
  /**
   * false by default.
   * If new selection doesn't select a feature that is already selected,
   * if true will let the feature selected,
   * else will deselect it.
   */
  keepCurrentSelection?: boolean
}
