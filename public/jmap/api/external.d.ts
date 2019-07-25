declare interface JExternalModel {
  id: string
  serviceToExpose?: any
  startBeforeMapIsReady?: boolean
  initFn: (options: any) => void
  storeReducer?: (reducerState: any, action: any) => any
  renderMouseOver?(layer: JLayer, feature: any): JExternalMouseOver
}

declare interface JExternalMouseOver {
  html: string  // static html content
  js?: string   // javascript that will be evaluated after html rendered
}
