declare type JPhotoProjectionType = "none" | "equirectangular"

declare interface JPhoto {
  id: number
  url: string
  title: string
  fileName: string
  comment: string
  metadata: JPhotoMetadata
  imageBase64: string
  hasChanged?: boolean
  isFormUrl?: boolean // TODO remove when endpoint that returns directly the image will exist
  isNewPhoto?: boolean
  isRemoved?: boolean
  canDelete?: boolean
  canUpdate?: boolean
}

declare interface JPhotoEventContainerCreatedParams {
  container: HTMLElement
}

declare interface JPhotoMetadata {
  projectionType: JPhotoProjectionType
}
