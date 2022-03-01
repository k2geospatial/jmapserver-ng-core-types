declare interface JIFramePopup {
  src: string
  title: string
  initialPosition: JLocation
  initialWidth: string
  initialHeight: string
  resizable: boolean
  hideBorder: boolean
}

declare interface JIFramePopupParams extends Partial<JIFramePopup> {
  src: string
}
