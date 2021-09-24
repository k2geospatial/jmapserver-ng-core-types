declare type JDateLike = number | Date | string
declare type JDateUnit = "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" |"years"

declare interface JDateFormatParams {
  displayTime?: boolean
  prefix?: string
}
