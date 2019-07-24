declare type LAYER_GEOMETRY = "ANNOTATION" | "CURVE" | "COMPLEX" | "POINT" | "RASTER" | "SURFACE" | "ELLIPSE" | "NONE"

declare type JLayerAttributeType = "string" | "number" | "date" | "datetime" | "boolean" | "binary"

declare type JLayerThematicType = "INDIVIDUAL_VALUES" | "GRADUATED_STYLE" | "OTHER"

declare type JLayerThematicPrimitiveType = "LINE" | "POINT" | "AREA"

declare type JLayerStyleType = "POINT" | "LINE" | "SURFACE" | "ANNOTATION" | "IMAGE" | "MIXED"

declare type JLayerStyleArrow = "NONE" | "FORWARD" | "BACKWARD"

declare interface JLayerGeometry {
  type: LAYER_GEOMETRY
  editable: boolean
}

declare interface JLayer extends JLayerTreeElement {
  geometry: JLayerGeometry
  attributes: JLayerAttribute[]
  mouseOver: JMapMouseOver
  simpleSelectionStyle: JLayerSimpleStyle
  selectionStyle: JLayerStyle
  baseStyles: JLayerStyleScaled[]
  thematics: JLayerThematic[]
  extent: JBoundaryBox | null
}

declare interface JLayerAttribute {
  id: string
  label: string
  type: JLayerAttributeType
}

declare interface JLayerTreeElement {
  id: number,
  name: string,
  description: string
  initialVisibility: boolean
  visible: boolean
  isGroup: boolean
  path: string
}

declare type JLayerTree = Array<JLayerTreeElement>

declare interface JLayerThematic {
  id: number
  enabled: boolean
  isVisible: boolean
  name: string
  description: string
  type: JLayerThematicType
  baseStyle: JLayerStyle
  primitiveType: JLayerThematicPrimitiveType
  elementCount: number
  title: string
  subTitle: string
}

declare interface JLayerStyleScaled {
  minScale: number
  style: JLayerStyle
}

declare interface JLayerSimpleStyle {
  transparency: number
  fillColor: string
  lineColor: string
}

declare interface JLayerStyle {
  styleType: JLayerStyleType
  imageSampleInBase64: string
  transparencyPerCent: number
}

declare interface JLayerStyleVector extends JLayerStyle {
  antiAliasing: boolean
}

declare interface JLayerStylePoint extends JLayerStyleVector {
  styleType: "POINT"
  symbolScale: number
  symbolRotationInDegree: number
  symbolProportionalSizeEnabled: boolean
  symbolProportionalSize: number
  symbolRotateWithMapEnabled: boolean
  symbolOffsetX: number
  symbolOffsetY: number
  symbolVector: JLayerStyleSymbolVector | null
  symbolImage: JLayerStyleSymbolImage | null
}

declare interface JLayerStyleLine extends JLayerStyleVector {
  styleType: "LINE"
  lineColor: JRGBColor
  lineThickness: number
  arrowType: JLayerStyleArrow
  arrowPositionFromLeftInPerCent: number
}

declare interface JLayerStyleSurface extends JLayerStyleVector {
  styleType: "SURFACE"
  fillColor: JRGBColor
  transparentFill: boolean 
  borderColor: JRGBColor
  borderTransparencyInPercent: number
  borderThickness: number
  surfacePattern: string
  patternColor: JRGBColor
  patternTransparentFill: boolean
}

declare interface JLayerStyleAnnotation extends JLayerStyleVector {
  styleType: "ANNOTATION"
  textFont: string
  textColor: JRGBColor
  textBold: boolean
  textItalic: boolean
  textUnderlined: boolean
  textStrikeThrough: boolean
  textOutlined: boolean
  textOutlineColor: JRGBColor
}

declare interface JLayerStyleMixed extends JLayerStyleVector {
  styleType: "MIXED"
  point: JLayerStylePoint
  line: JLayerStyleLine
  surface: JLayerStyleSurface
  text: JLayerStyleAnnotation
}

declare interface JLayerStyleSymbolImage {
  absoluteFilePath: string
}

declare interface JLayerStyleSymbolVector {
  vectorSymbol: string
  borderThickness: number
  borderColor: JRGBColor
  transparentFill: boolean
  fillColor: JRGBColor
}

declare interface JRGBColor {
  red: number
  green: number
  blue: number
  alpha: number
  hexa: string
}