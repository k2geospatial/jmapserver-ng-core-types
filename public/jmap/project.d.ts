declare namespace JMap.Service.Project {
  function setId(projectId: string): void
}

declare interface JProjectEventParams {
  project: JProject
}

declare interface JProject {
  id: number
  name: string
  description: string
  projection: JProjection
  initialRotation: number
  scaleMax: number
  scaleMin: number
  colorSelection: string
  colorBackground: string
  initialExtent: JBounds | null
  apiKey: {
    google: string | null
    bing: string | null
    mapBox: string | null
  }
}
