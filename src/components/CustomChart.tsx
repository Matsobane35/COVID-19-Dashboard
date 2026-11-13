import ReactApexChart from "react-apexcharts";
import covidData from "../assets/covid-19.json"
import { countryIndices } from "../data";
import { formatDate, getIncrementalSeries, getSeries } from "../globalFunctions";
import type { ChartProps } from "../props";
import { useState } from "react";

export default function CustomChart(
  { country, dateRange, metric, chartType }: ChartProps
) {

  const [barGraphFrequency, setBarGraphFrequency] = useState("interval")

  return (
    <div className="h-fit w-[calc(100%-32px)] mt-16 mx-4">
      <p className="z-100 place-self-center max-w-[calc(100%-80px)] text-black text-[20px] font-bold text-center mb-2">{`${chartType === "line" ? metric.charAt(0).toUpperCase() + metric.slice(1) : "New cases"} in ${country} ${dateRange.start.getTime() === dateRange.end.getTime() ? `on ${formatDate(dateRange.start)}` : `between ${formatDate(dateRange.start)} and ${formatDate(dateRange.end)}`}`}</p>
      <ReactApexChart
      options={{
        chart: { background: "#f0f0f0", toolbar: { show: false } },
        grid: { padding: { left: 40, bottom: 60, right: 40 } },
        stroke: { curve: "smooth" },
        plotOptions: {
          bar: { dataLabels: { position: "top" } }
        },
        dataLabels: {
          enabled: chartType === "bar",
          offsetY: -20,
          style: { colors: ["#444"] }
        },
        xaxis: {
          type: "datetime",
          min: dateRange.start.getTime(),
          max: dateRange.end.getTime(),
          labels: { rotate: -45, rotateAlways: true, hideOverlappingLabels: false, format: "yyyy-MM-dd", datetimeUTC: false },
          title: {
            text: "Dates",
            offsetY: 50,
            style: {
              fontSize: "14px"
            }
          }
        },
        yaxis: {
          labels: { padding: 40 },
          title: {
            text: `Number of ${chartType === "line" ? metric : "new cases"}`,
            offsetX: 10,
            style: {
              fontSize: "14px"
            }
          }
        }
      }}
      series={[{ data: chartType === "line" ? getSeries(covidData.countries[countryIndices[country]].data, metric) : getIncrementalSeries(covidData.countries[countryIndices[country]].data, barGraphFrequency) }]}
      type={chartType === "line" ? "line" : "bar"}
      height="400"
      width="100%"/>
      {chartType === "bar" && <div className="flex w-full gap-2">
        <p onClick={() => setBarGraphFrequency("interval")} className={`${barGraphFrequency === "interval" ? "bg-purple-500" : "bg-purple-200"} h-9 w-full flex-1 rounded-[1000px] px-4 flex items-center justify-center text-[0.9rem] text-black font-semibold hover:cursor-pointer`}><span className="line-clamp-1">Intervals</span></p>
        <p onClick={() => setBarGraphFrequency("daily")} className={`${barGraphFrequency === "daily" ? "bg-purple-500" : "bg-purple-200"} h-9 w-full flex-1 rounded-[1000px] px-4 flex items-center justify-center text-[0.9rem] text-black font-semibold hover:cursor-pointer`}><span className="line-clamp-1">Daily</span></p>
      </div>}
    </div>
  )
}