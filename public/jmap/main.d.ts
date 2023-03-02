// ALL_OPERATING_SYSTEMS in all-enum.ts
declare const enum JOPERATING_SYSTEMS {
  UNKNOWN = "",
  MAC = "mac",
  WINDOWS = "windows",
  IOS = "ios",
  ANDROID = "android",
  LINUX = "linux"
}

// ALL_FATAL_ERROR_CONTEXTS in all-enum.ts
declare const enum JFATAL_ERROR_CONTEXTS {
  FORM = "FORM",
  LAYER = "LAYER",
  MAP = "MAP",
  PROJECT = "PROJECT"
}

declare type JId = string | number

declare interface JSize {
  width: number
  height: number
}

declare interface JMainFatalErrorEventParams {
  context: JFATAL_ERROR_CONTEXTS
  source: string
  action: string
}
