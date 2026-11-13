import type { CountryName, DateRange } from "./data"

export interface DropdownProps {
  animateMenuDown: boolean,
  setAnimateMenuDown: (expand: boolean) => void,
  expanded: boolean,
  setExpanded: (expanded: boolean) => void,
  selectedCountry: string,
  onCountrySelected: (country: CountryName) => void
}

export interface DatePickerProps {
  dateBound: string,
  selectedDates: DateRange,
  setSelectedDates: (dateRange: DateRange) => void
  onDateSelected: (dateSelected: boolean) => void
}

export interface ChartProps {
  country: CountryName,
  dateRange: DateRange,
  metric: string,
  chartType: string
}