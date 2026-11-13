# **COVID-19 Early Outbreak Dashboard**

# **Introduction**

This project is a single-page web dashboard that shows COVID-19 outbreak trends between 01-02-2020 and 31-03-2020 in China, Italy, South Africa, South Korea and USA. The data used in this project is included in the project files in JSON format under /src/assets for reference. This time series data is not continuous - there are irregular-sized gaps between dates, which means some dates may not show exact data points. The dashboard landing page consists of a simple control panel where the user can select a country to view trends for, select a specific metric to view and filter the charts by date to zoom into specific segments of the charts.

# Project setup and library choices
This is a Vite-instantiated React project that uses TypeScript as the programming language and Tailwind CSS as the styling framework. The chart library used is the ReactApexCharts library, which was chosen for its feature-completeness and customizability. 

# Interacting with the dashboard
There are two charts on the page. The first one is a line graph that displays four main metrics: confirmed cases, deaths, recoveries and active cases. The user can select which metric to view from the 'select metric' section above the chart. The second chart is a bar graph showing the number of new COVID-19 cases, calculated by taking the difference between two adjacent data points. 

The bar graph is available in two options in accordance with the two buttons positioned directly below the graph. The first option, 'Intervals', presents the graph according to actual dates available in the data, leaving blanks where dates are not available. The second option, 'Daily', interpolates data between missing dates to ensure that each day has a corresponding y-axis value by dividing the difference between adjacent data points by the number of days (interval length).

When the user filters the dataset by date, actual data points will only appear when these data points fall within the filtered dates. Otherwise the line graph will show an interpolated line between known data points, while the interval-based bar graph will not show anything at all since it used discrete data. When the filtered dates lie before the first known date or after the last known date, both graphs will be empty.

Selecting a metric to view only updates the line graph since the bar graph is based on total confirmed data, which only changes when the user selects a new country. Each newly selected metric still applies the same date filters that have already been set.

When the user selects a specific country from the 'Select country' dropdown menu, both charts get updated, but still with the existing date filters.
