declare type JPhotoProjectionType = "none" | "equirectangular"

declare interface JPhoto {
  id: number
  url: string
  title: string
  fileName: string
  comment: string
  metadata: JPhotoMetadata
  imageBase64: string
  isFormUrl?: boolean // TODO remove when endpoint that returns directly the image will exist
  isNewPhoto?: boolean
  isRemoved?: boolean
}

declare interface JPhotoEventContainerCreatedParams {
  container: HTMLElement
}

declare interface JPhotoMetadata {
  projectionType: JPhotoProjectionType
}
