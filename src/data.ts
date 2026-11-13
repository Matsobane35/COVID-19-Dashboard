export interface DateRange {
  start: Date,
  end: Date
}

export const defaultDateRange: DateRange = {
  start: new Date(2020, 1, 1),
  end: new Date(2020, 2, 31)
}

export const countryIndices = {
    "China": 0,
    "Italy": 1,
    "South Africa": 4,
    "South Korea": 2,
    "United States of America": 3
  }

export type CountryName = keyof typeof countryIndices