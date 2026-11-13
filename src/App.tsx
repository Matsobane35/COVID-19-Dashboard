import { useState } from "react"
import CountrySelectorDDM from "./components/CountrySelectorDDM"
import DatePicker from "./components/DatePicker"
import { defaultDateRange, type CountryName } from "./data"
import CustomChart from "./components/CustomChart"

function App() {
  
  const [openMenu, setOpenMenu] = useState(false)
  const [menuOpened, setMenuOpened] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryName>("China")
  const [selectedMetric, setSelectedMetric] = useState("confirmed cases")
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [currentDateRange, setCurrentDateRange] = useState(defaultDateRange)
  const [dateRangeBound, setDateRangeBound] = useState("")

  return (
    <div>
      {/** HEADING */}
      <section className="z-50 h-20 w-full bg-purple-400 flex items-center justify-center px-4 text-2xl text-black font-bold fixed text-center">
        COVID-19 Early Outbreak Trends
      </section>
      <div className="h-20"></div>
      <section className="h-fit w-full max-w-220 flex flex-col items-center place-self-center pb-12">
        {/** Country selector dropdown menu */}
        <CountrySelectorDDM
        animateMenuDown={openMenu}
        setAnimateMenuDown={setOpenMenu}
        expanded={menuOpened}
        setExpanded={setMenuOpened}
        selectedCountry={selectedCountry}
        onCountrySelected={setSelectedCountry}/>
        {/** Metric selector */}
        <div className="h-fit w-[calc(100%-32px)] mt-4 mx-4 px-3 pb-3 bg-purple-200 rounded-2xl flex flex-col">
          <p className="text-[0.8rem] md:text-[0.7rem] text-black font-bold my-2">Select metric</p>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full flex gap-2">
              <p onClick={() => setSelectedMetric("confirmed cases")} className={`h-12 md:w-full flex-1 md:h-10 rounded-[1000px] px-4 flex items-center justify-center text-[1rem] md:text-[0.9rem] text-black font-semibold border-2 border-purple-500 ${selectedMetric !== "confirmed cases" ? "bg-purple-200 hover:cursor-pointer hover:bg-[#ce96ff] hover:border-[#ce96ff]" : "bg-purple-500"}`}><span className="line-clamp-1">Confirmed cases</span></p>
              <p onClick={() => setSelectedMetric("confirmed deaths")} className={`h-12 md:w-full flex-1 md:h-10 rounded-[1000px] px-4 flex items-center justify-center text-[1rem] md:text-[0.9rem] text-black font-semibold border-2 border-purple-500 ${selectedMetric !== "confirmed deaths" ? "bg-purple-200 hover:cursor-pointer hover:bg-[#ce96ff] hover:border-[#ce96ff]" : "bg-purple-500"}`}><span className="line-clamp-1">Confirmed deaths</span></p>
            </div>
            <div className="w-full flex gap-2">
              <p onClick={() => setSelectedMetric("confirmed recoveries")} className={`h-12 md:w-full flex-1 md:h-10 rounded-[1000px] px-4 flex items-center justify-center text-[1rem] md:text-[0.9rem] text-black font-semibold border-2 border-purple-500 ${selectedMetric !== "confirmed recoveries" ? "bg-purple-200 hover:cursor-pointer hover:bg-[#ce96ff] hover:border-[#ce96ff]" : "bg-purple-500"}`}><span className="line-clamp-1">Confirmed recoveries</span></p>
              <p onClick={() => setSelectedMetric("active cases")} className={`h-12 md:w-full flex-1 md:h-10 rounded-[1000px] px-4 flex items-center justify-center text-[1rem] md:text-[0.9rem] text-black font-semibold border-2 border-purple-500 ${selectedMetric !== "active cases" ? "bg-purple-200 hover:cursor-pointer hover:bg-[#ce96ff] hover:border-[#ce96ff]" : "bg-purple-500"}`}><span className="line-clamp-1">Active cases</span></p>
            </div>
          </div>
        </div>
        {/** Date selector */}
        <div className="h-fit w-[calc(100%-32px)] mt-4 mx-4 px-3 pb-3 bg-purple-200 rounded-2xl flex flex-col">
          <p className="text-[0.8rem] md:text-[0.7rem] text-black font-bold my-2">Select date range</p>
          <div className="w-full flex gap-2">
            <p onClick={() => {setOpenDatePicker(true); setDateRangeBound("From")}} className="h-12 md:w-full flex-1 md:h-10 rounded-[1000px] bg-purple-500 hover:bg-[#ce96ff] px-4 flex items-center justify-center text-[1rem] md:text-[0.9rem] text-black font-semibold hover:cursor-pointer"><span className="line-clamp-1">{`From: ${currentDateRange.start.getDate()} ${["Jan", "Feb", "Mar"][currentDateRange.start.getMonth()]} 2020`}</span></p>
            <p onClick={() => {setOpenDatePicker(true); setDateRangeBound("To")}} className="h-12 md:w-full flex-1 md:h-10 rounded-[1000px] bg-purple-500 hover:bg-[#ce96ff] px-4 flex items-center justify-center text-[1rem] md:text-[0.9rem] text-black font-semibold hover:cursor-pointer"><span className="line-clamp-1">{`To: ${currentDateRange.end.getDate()} ${["Jan", "Feb", "Mar"][currentDateRange.end.getMonth()]} 2020`}</span></p>
          </div>
        </div>
        <CustomChart
        country={selectedCountry}
        dateRange={currentDateRange}
        metric={selectedMetric}
        chartType="line"/>
        <CustomChart
        country={selectedCountry}
        dateRange={currentDateRange}
        metric={selectedMetric}
        chartType="bar"/>
        {menuOpened && <div onClick={() => setOpenMenu(false)} className="fixed h-full w-full bg-black/60"/>}
        {openDatePicker && <div onClick={() => setOpenDatePicker(false)} className="fixed h-full w-full bg-black/60 z-10">
          <DatePicker
          dateBound={dateRangeBound}
          selectedDates={currentDateRange}
          setSelectedDates={setCurrentDateRange}
          onDateSelected={setOpenDatePicker}/>
        </div>}
      </section>
    </div>
  )

}

export default App
