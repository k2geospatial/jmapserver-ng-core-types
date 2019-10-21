declare interface JElementSelection {
  [layerId: number]: number[]
}

declare interface JElementSelectionWithAttribute {
  attributeName: string
  layerName: string
  elementIds: string[]
}

/**
 * @param toggleSelection true by default. If new selection select a feature that is already selected, if parameter is true it will deselect the feature, else will let the feature selected.
 * @param keepCurrentSelection false by default. If new selection doesn't select a feature that is already selected, if true will let the feature selected, else will deselect it.
 */
declare interface JMapSelectionParams {
  toggleSelection?: boolean
  keepCurrentSelection?: boolean
}
