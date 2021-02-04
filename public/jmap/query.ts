declare interface JQueryGroup {
  id: number
  name: string
  queries: JQuery[]
}

declare interface JQuery {
  id: string
  groupId: number
  name: string
  layerId: number
  maxScale: number
  maxResults: number,
  formMetaData: JFormMetaData
}
