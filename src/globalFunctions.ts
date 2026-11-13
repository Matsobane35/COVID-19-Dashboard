import covidData from "./assets/covid-19.json"

export function createDate(date: string): Date {
  return new Date(parseInt(date.split('-')[0]), parseInt(date.split('-')[1]) - 1, parseInt(date.split('-')[2]))
}

export function formatDate(date: Date): string {
  const dateParts = date.toDateString().split(" ")
  return `${parseInt(dateParts[2])} ${dateParts[1]} ${dateParts[3]}`
}

export function getSeries(data: typeof covidData.countries[0]["data"], metric: string): { x: number, y: number }[] {
  return data.map(innerObject => metric === "confirmed cases" ? { x: createDate(innerObject.date).getTime(), y: innerObject.confirmed } : metric === "confirmed deaths" ? { x: createDate(innerObject.date).getTime(), y: innerObject.deaths } : metric === "confirmed recoveries" ? { x: createDate(innerObject.date).getTime(), y: innerObject.recovered } : { x: createDate(innerObject.date).getTime(), y: innerObject.confirmed - innerObject.deaths - innerObject.recovered } )
}

export function getIncrementalSeries(data: typeof covidData.countries[0]["data"], frequency: string): { x: number, y: number }[] {
  if (frequency === "daily") {
    const totalDays = Math.round((createDate(data[data.length-1].date).getTime() - createDate(data[0].date).getTime())/(1000*60*60*24))
    const dailyDays: number[] = [createDate(data[0].date).getTime()]
    const dailyCases: number[] = [data[0].confirmed]
    for (let i = 1; i <= totalDays; i++) {
      dailyDays.push(Math.round(dailyDays[0] + i*(1000*60*60*24)))
    }
    for (let i1 = 0; i1 <= data.length - 2; i1++) {
      const daysPerInterval = Math.round((createDate(data[i1+1].date).getTime() - createDate(data[i1].date).getTime())/(1000*60*60*24))
      for (let i2 = 1; i2 <= daysPerInterval; i2++) {
        const casesPerDay = (data[i1+1].confirmed - data[i1].confirmed)/daysPerInterval
        dailyCases.push(Math.round((casesPerDay + Number.EPSILON)*100)/100)
      }
    }
    console.log(dailyDays)
    console.log(dailyCases)
    return dailyDays.map((day, index) => ({ x: day, y: dailyCases[index] }))
  }
  else {
    const array1 = data.map(innerObject => innerObject.confirmed)
    return data.map((innerObject, index) => index === 0 ? { x: createDate(innerObject.date).getTime(), y: array1[index] } : { x: createDate(innerObject.date).getTime(), y: array1[index] - array1[index-1] })
  }
}