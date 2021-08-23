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
