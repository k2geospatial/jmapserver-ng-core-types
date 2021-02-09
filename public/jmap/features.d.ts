declare interface JAttributeValueByName {
  [attributeName: string]: any
}

declare interface JFeatureGeometryUpdateParams {
  layerId: JId
  featureId: JId
  geometry: GeoJSON.Geometry
}

declare interface JFeatureEventDeleteParams {
  layerId: JId
  featureIds: JId[]
}

declare interface JFeatureEventGeometryChangedParams extends JFeatureGeometryUpdateParams {
  // nothing to add
}

declare interface JFeatureDeleteByIdsResult {
  success: JId[]
  error: JId[]
}
