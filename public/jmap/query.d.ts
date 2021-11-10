declare interface JQueryGroup {
  id: JId
  name: string
  queries: JQuery[]
}

declare interface JQuery {
  id: string // unique id, set by NG
  jmapId: JId // non unique id, set by server, used to fetch query form (associate to layer id)
  groupId: JId
  name: string
  layerId: JId
  maxScale: number
  maxResults: number,
  isInitialized: boolean
  isLoading: boolean
  hasLoadingError: boolean
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

declare interface JQuerySuccessEventParams extends JQueryBeforeEventParams {
  returnedFeatures: GeoJSON.Feature[]
}

declare interface JQueryErrorEventParams extends JQueryBeforeEventParams {
  error: string
}

declare interface JQueryQueryFormHasLoadedEventParams {
  query: JQuery
}
