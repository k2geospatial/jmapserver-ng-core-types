declare type JDateLike = number | Date | string

// ALL_TIME_UNITS in all-enum.ts
declare const enum JTIME_UNITS {
  SECONDS = "seconds",
  MINUTES = "minutes",
  HOURS = "hours",
  DAYS = "days",
  WEEKS = "weeks",
  MONTHS = "months",
  YEARS = "years"
}

declare interface JDateFormatParams {
  displayTime?: boolean
  prefix?: string
}
