// ALL_GEOMETRY_UNITS in all-enum.ts
declare const enum JGEOMETRY_UNITS {
  KILOMETERS = "kilometers",
  MILES = "miles",
  DEGREES = "degrees",
  RADIANS = "radians"
}

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

declare type JPoint = [number, number] | [number, number, number]

declare type JLine = JPoint[]

declare type JPolygon = JPoint[]

declare interface JCircle {
  center: JLocation
  /**
   * With mapbox the radius unit is kilometer
   */
  radius: number
}

declare interface JObjectId {
  project: string
  layer: string
  element: string
}
