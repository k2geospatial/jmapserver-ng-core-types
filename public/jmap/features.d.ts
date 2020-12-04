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
  featureId: JId
}

declare interface JFeatureEventGeometryChangedParams extends JFeatureGeometryUpdateParams {
  // nothing to add
}
