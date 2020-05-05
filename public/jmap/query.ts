declare interface JQueryGroup {
  id: number
  name: string
  queries: JQuery[]
}

declare interface JQuery {
  id: number
  groupId: number
  name: string
  layerId: number
  maxScale: number
  maxResults: number,
  form: JForm
}
