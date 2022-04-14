declare interface JAttributeValueByName {
  [attributeName: string]: any
}

declare interface JFeatureGeometryUpdateParams {
  layerId: JId
  featureId: JId
  geometry: GeoJSON.Geometry
}

declare interface JFeatureEventGeometryUpdateParams {
  layerId: JId
  updatedFeature: GeoJSON.Feature
}

declare interface JFeatureEventDeleteParams {
  layerId: JId
  deletedFeatures: GeoJSON.Feature[]
}

declare interface JFeatureDeleteByIdsResult {
  layerId: JId
  inSuccessIds: JId[]
  inErrorIds: JId[]
}

declare interface JFeatureEventGeometryCreateParams {
  layerId: JId
  featureId: JId
  featureGeometry: GeoJSON.Geometry
  featureProperties: JAttributeValueByName
}
