import type { DatePickerProps } from "../props"

export default function DatePicker(
  { dateBound, selectedDates, setSelectedDates, onDateSelected }: DatePickerProps
) {

  const months = [{ name: "February", startDay: new Date(2020, 1, 1).getDay() }, { name: "March", startDay: new Date(2020, 2, 1).getDay() }]
  const weeks = [1, 2, 3, 4, 5]
  const days = ["S", "M", "T", "W", "T", "F", "S"]

  function setNewDate(newMonth: number, newDay: number) {
    if (dateBound === "From" && new Date(2020, newMonth + 1, newDay) <= selectedDates.end) {
      setSelectedDates({...selectedDates, start: new Date(2020, newMonth + 1, newDay)})
      onDateSelected(false)
    }
    else if (dateBound === "To" && new Date(2020, newMonth + 1, newDay) >= selectedDates.start) {
      setSelectedDates({...selectedDates, end: new Date(2020, newMonth + 1, newDay)})
      onDateSelected(false)
    }
  }

  return (
    <div onClick={e => e.stopPropagation()} className="w-fit h-90 flex flex-col gap-8 place-self-center rounded-3xl bg-purple-200 mt-8 p-3 overflow-scroll [&::-webkit-scrollbar]:hidden">
      {months.map((month, indexMonth) => 
      <div key={indexMonth} className="w-fit h-fit flex flex-col rounded-2xl border-2 border-purple-500">
        <div className="w-full h-10 bg-purple-500 flex items-center justify-center text-[0.85rem] md:text-[0.75rem] text-black font-semibold rounded-t-[10px]">{`${month.name} 2020`}</div>
        <div className="flex w-full h-10 items-start justify-between px-0.5 bg-purple-500">
          {days.map((day, index) => 
          <p key={index} className="w-7 h-7 flex items-center justify-center text-[0.85rem] md:text-[0.75rem] text-black font-bold">{day}</p>
          )}
        </div>
        <div className="w-fit flex flex-col py-1">
          {weeks.map((_, indexWeek) => 
          <div key={indexWeek} className="w-fit h-fit flex">
            {days.map((_, indexDay) => 
            <p 
              key={indexDay} 
              onClick={() => setNewDate(indexMonth, indexWeek*7 + indexDay - month.startDay + 1)} 
              className={`${(dateBound === "To" && new Date(2020, indexMonth + 1, indexWeek*7 + indexDay - month.startDay + 1) < selectedDates.start) || (dateBound === "From" && new Date(2020, indexMonth + 1, indexWeek*7 + indexDay - month.startDay + 1) > selectedDates.end) ? "text-[#c4c4c4]" : `${dateBound === "To" && new Date(2020, indexMonth + 1, indexWeek*7 + indexDay - month.startDay + 1).getTime() === selectedDates.end.getTime() ? "bg-purple-500" : ""} ${dateBound === "From" && new Date(2020, indexMonth + 1, indexWeek*7 + indexDay - month.startDay + 1).getTime() === selectedDates.start.getTime() ? "bg-purple-500" : ""} text-black hover:border-2 hover:border-purple-500 hover:cursor-pointer`} w-8 h-8 flex items-center justify-center text-[0.85rem] md:text-[0.75rem] rounded-[50%] ${indexWeek*7 + indexDay - month.startDay + 1 <= 0 || indexWeek*7 + indexDay - month.startDay + 1 > 31 ? "invisible" : ""}`}>{indexWeek*7 + indexDay - month.startDay + 1}</p>
            )}
          </div>
          )}
        </div>
      </div>
      )}
    </div>
  )
}