// ALL_OPERATING_SYSTEMS in all-enum.ts
declare const enum JOPERATING_SYSTEMS {
  UNKNOWN = "",
  MAC = "mac",
  WINDOWS = "windows",
  IOS = "ios",
  ANDROID = "android",
  LINUX = "linux"
}

declare type JId = string | number

declare interface JSize {
  width: number
  height: number
}
