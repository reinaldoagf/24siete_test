import React, { useEffect, useState } from 'react'

const lastOptions = [7,15,30]


export default function KeyPerformanceIndicator({ data }) {
  const [lastAppointments, setLastAppointments] = useState(0)
  const [lastOption, setLastOption] = useState(0)

  const calculateLastAppointments = (appointments) => {
    const today = new Date();
    const past7Days = new Date(today);
    past7Days.setDate(today.getDate() - lastOptions[lastOption]);
  
    // Filtrar las citas en los últimos 7 días
    const lastAppointments = appointments.filter((appointment) => {
      const appointmentDate = new Date(`${appointment.fecha} ${appointment.hora}`);
      return appointmentDate >= past7Days && appointmentDate <= today;
    });
    
    return lastAppointments.length; // Retorna la cantidad de citas
  };

  const changeLastOption = () => {
    setLastOption(lastOption === 2 ? 0 : lastOption + 1)
  }

  useEffect(() => {
    setLastAppointments(calculateLastAppointments(data.appointments))
  }, [lastOption])

  return (
  <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
    <div className="flex justify-between">
      <div>
        <h5 className="leading-none text-3xl font-bold text-gray-900  pb-2">{data.appointments.length}</h5>
        <p className="text-base font-normal text-gray-500 ">{data.title}</p>
      </div>
      <div className="flex flex-col justify-between">
      <div className="flex justify-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center">
        {lastAppointments}
      </div>
      
      <button
        onClick={()=>{
          changeLastOption()
        }}
          id="dropdownDefaultButton"
          data-dropdown-toggle="lastDaysdropdown"
          data-dropdown-placement="bottom"
          className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 hover:bg-gray-100 px-3 py-2"
          type="button"
        >
          Últimos {lastOptions[lastOption]} días
          <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
        </button>
        </div>
    </div>
  </div>
  )
}
