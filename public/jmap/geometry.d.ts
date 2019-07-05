declare interface JBounds {
  x1: number
  x2: number
  y1: number
  y2: number
}

declare interface JBoundaryBox {
  sw: JLocation
  ne: JLocation
}

declare interface JLocation {
  x: number
  y: number
}

declare type JPoint = [ number, number ]

declare type JPolygon = Array<JPoint>

declare interface JCircle {
  center: JLocation,
  radius: number
}

declare interface JObjectId {
  project: string
  layer: string
  element: string
}
