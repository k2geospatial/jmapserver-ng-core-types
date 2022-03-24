// ALL_PHOTO_PROJECTION_TYPES in all-enum.ts
declare const enum JPHOTO_PROJECTION_TYPES {
  NONE = "none",
  EQUIRECTANGULAR = "equirectangular"
}

declare interface JPhoto {
  id: JId
  url: string
  title: string
  fileName: string
  comment: string | undefined
  metadata: JPhotoMetadata
  imageBase64: string
  hasChanged?: boolean
  isNewPhoto?: boolean
  isRemoved?: boolean
  canDelete?: boolean
  canUpdate?: boolean
  initialTitle?: string
  initialComment?: string | undefined
  /**
   * Used to store the generated id (the one used when creating photo that are not yet saved).
   * Required to replace in the store photo list, after the photo has been successfully
   * created on the server.
   */
  oldTempCreationId?: JId
}

declare interface JPhotoOpenPopupParams {
  selectedPhotoId?: JId
  keepSameSelectedPhotoId?: boolean
  onDelete?: (photo: JPhoto) => boolean
  onUpdate?: (photo: JPhoto, title: string, comment: string | undefined) => boolean
}

declare interface JPhotoEventContainerCreatedParams {
  container: HTMLElement
}

declare interface JPhotoMetadata {
  projectionType: JPHOTO_PROJECTION_TYPES
}
