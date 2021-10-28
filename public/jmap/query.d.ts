declare interface JQueryGroup {
  id: JId
  name: string
  queries: JQuery[]
}

declare interface JQuery {
  id: string
  groupId: JId
  name: string
  layerId: JId
  maxScale: number
  maxResults: number,
  formMetaData: JFormMetaData
}

declare interface JQueryBeforeEventParams {
  id: string
  groupId: string
  name: string
  layerId: JId
  maxScale: number
  maxResults: number
  enteredData: any
}

declare interface JQuerySuccessEventParams {
  id: string
  groupId: string
  name: string
  layerId: JId
  maxScale: number
  maxResults: number
  enteredData: any
  returnedFeatures: GeoJSON.Feature[]
}

declare interface JQueryErrorEventParams {
  id: string
  groupId: string
  name: string
  layerId: JId
  maxScale: number
  maxResults: number
  enteredData: any
  error: string
}
