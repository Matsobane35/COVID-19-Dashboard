import { countryIndices, type CountryName } from "../data";
import type { DropdownProps } from "../props";

export default function CountrySelectorDDM(
  { animateMenuDown,
    setAnimateMenuDown,
    expanded,
    setExpanded,
    selectedCountry,
    onCountrySelected
  }: DropdownProps
) {

  const countries = Object.keys(countryIndices)
  
  return (
    <div className="h-fit w-[calc(100%-32px)] mt-4 mx-4 pb-3 bg-purple-200 rounded-2xl flex flex-col relative">
      <p className="text-[0.8rem] md:text-[0.7rem] text-black font-bold mt-2 mx-3">Select country</p>
      <div onClick={() => {setAnimateMenuDown(!animateMenuDown); if (!expanded) setExpanded(true)}} className="h-12 md:h-10 flex gap-2 justify-between items-center rounded-[1000px] bg-purple-500 mt-2 mx-3 px-4 hover:cursor-pointer hover:bg-[#ce96ff] z-10">
        <p className="text-[1rem] md:text-[0.9rem] text-black font-semibold line-clamp-1">{selectedCountry}</p>
        <svg className="min-h-4 md:min-h-3 min-w-4 md:min-w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1rem" height="1rem">
          <g className={`${animateMenuDown ? "translate-x-2": "translate-x-0"} transition-transform duration-300 ease-out`}>
            <path d="M4,8 l8,8" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round"/>
          </g>
          <g className={`${animateMenuDown ? "-translate-x-2": "translate-x-0"} transition-transform duration-300 ease-out`}>
            <path d="M12,16 l8,-8" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round"/>
          </g>
        </svg>
      </div>
      <div className="z-5 absolute mt-1 w-full h-9 bottom-0 [clip-path:inset(0px_0px_-242px_0px)] md:[clip-path:inset(0px_0px_-222px_0px)]">
        {expanded && <ul 
          onAnimationEnd={e => {if (e.animationName === "menu-slide-up") setExpanded(false)}} 
          className={`${animateMenuDown ? "animate-menu-slide-down" : "animate-menu-slide-up"} absolute bottom-0 shadow-md bg-white border border-gray-100 place-self-center h-fit w-[calc(100%-24px)] flex flex-col p-3 gap-1 rounded-xl overflow-scroll [&::-webkit-scrollbar]:hidden`}>
            <li className="h-5"/>
          {countries.map((country, index) => 
            <li key={index} onClick={() => {onCountrySelected(country as CountryName); setAnimateMenuDown(false)}}>
              <p className="flex items-center h-10 md:h-9 px-2 text-[0.9rem] font-semibold w-full bg-purple-200 hover:bg-purple-900 rounded-md hover:text-white hover:cursor-pointer">{country} <span className={`ml-2 ${selectedCountry !== country ? "hidden" : ""}`}><svg className="min-h-6 md:min-h-5 min-w-6 md:min-w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1rem" height="1rem"><path d="M12,7 a5,5 0,0 1,0 10 a5,5 0,0 1,0 -10 m0,-3 v16 m-8,-8 h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span></p>
            </li>)}
        </ul>}
      </div>
    </div>
  )
}