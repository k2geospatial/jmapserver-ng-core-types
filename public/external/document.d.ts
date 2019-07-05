declare type JDocumentMode = "MENU" | "SELECTION" | "SEARCH_BASIC" | "SEARCH_ADVANCED"

declare interface JAllDocumentDescriptors {
  documents: JDocumentDescriptor[]
  hyperlinks: JHyperLinkDescriptor[]
}

declare interface JHyperLinkDescriptor {
  id: number
  url: string
  depositName: string
  depositId: number
  linkDescription: string
  linkImageLocation: string
  linkTitle: string
  linkFavicon: string
}

declare interface JDocumentDescriptor {
  identifier: number
  title: string
  description: string
  fileName: string
  creation: number // timestamp
  depositName: string
  depositId: number
  hasDownloadPermission: boolean
  documentAssociations: JElementSelectionWithAttribute[]
  metadataList: JDocumentMetadata[]
}

declare interface JDocumentMetadata {
  name: string
  values: (string | number)[]
}

declare interface JDepositDescriptor {
  id: number
  name: string
  description: string
}
