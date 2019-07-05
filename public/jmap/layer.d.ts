declare type LAYER_GEOMETRY = "ANNOTATION" | "CURVE" | "COMPLEX" | "POINT" | "RASTER" | "SURFACE" | "ELLIPSE" | "NONE"

declare type JLayerAttributeType = "string" | "number" | "date" | "datetime" | "boolean" | "binary"

declare interface JLayerGeometry {
  type: LAYER_GEOMETRY
  editable: boolean
}

declare interface JLayer extends JLayerElement {
  geometry: JLayerGeometry
  attributes: JLayerAttribute[]
  selectionStyle: JLayerStyle
  mouseOver: JMapMouseOver
}

declare interface JLayerStyle {
  transparency: number
  fillColor: string
  lineColor: string
}

declare interface JLayerAttribute {
  id: string
  label: string
  type: JLayerAttributeType
}

declare interface JLayerElement {
  id: number,
  name: string,
  description: string
  initialVisibility: boolean
  visible: boolean
  isNode: boolean
  path: string
}

declare type JLayerTree = Array<JLayerElement>