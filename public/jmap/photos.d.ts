declare type JPhotoProjectionType = "none" | "equirectangular"

declare interface JPhoto {
  id: number
  url: string
  title: string
  fileName: string
  comment: string
  metadata: JPhotoMetadata
  imageBase64: string
}

declare interface JPhotoEventContainerCreatedParams {
  container: HTMLElement
}

declare interface JPhotoMetadata {
  projectionType: JPhotoProjectionType
}
