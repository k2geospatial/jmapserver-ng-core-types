declare type JOperatingSystem = "" | "mac" | "windows" | "ios" | "android" | "linux"
declare type JId = string | number

declare interface JArrayService {
  remove<T>(array: T[], object: T): T[]
  findByProperty<T extends object>(array: T[], propertyName: string, value: any): T | undefined
  findIndexByProperty<T extends object>(array: T[], propertyName: string, value: any, nonStrict?: boolean): number
  removeByProperty<T extends object>(array: T[], propertyName: string, value: any, nonStrict?: boolean): T[]
}

declare interface JSize {
  width: number
  height: number
}
