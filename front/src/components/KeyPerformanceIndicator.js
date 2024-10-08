import React, { useEffect, useState } from 'react';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import dayjs from 'dayjs';

export default function KeyPerformanceIndicator({ data }) {
  const {entity, elements, title, filterType} = data
  /* daterange */
  // Estado para almacenar el rango de fechas seleccionado
  const [dateRange, setDateRange] = React.useState([null, null]);

  const [selectedOption, setSelectedOption] = useState("");
  const [filteredElements, setFilteredElements] = useState(0);
  const [options, setOptions] = useState([]);

  /* Chart */  
  const [backgroundColor, setBackgroundColor] = useState([
    'rgba(255, 99, 132, 0.2)',]);

    const [borderColor, setBorderColor] = useState([ 'rgba(255, 99, 132, 1)',]);
   
  const [labelsChart, setLabelsChart] = useState([]);
  const [pieChartsData, setPieChartsData] = useState({
    labels: [
      'Filtrados',
      'Otros'
    ],
    datasets: [{
      label: 'Doctores por especialidad',
      data: [0,0],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }]
  });
  
  const [lineChartsData, setLineChartsData] = useState({
    labels: [],
    datasets: [
      {
        label: '# de citas',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const calculateLastElements = (elements) => {
    const today = new Date();
    const pastDays = new Date(today);
    pastDays.setDate(today.getDate() - selectedOption);

    // Filtrar las citas en los últimos 7 días
    const lastElements = elements.filter((element) => {
      const elementDate = new Date(`${element.fecha} ${element.hora}`);
      return elementDate >= pastDays && elementDate <= today;
    });

    return lastElements.length; // Retorna la cantidad de citas
  };

  
  const calculateGenreElements = (elements) => {
    const filteredElements = elements.filter((element) => {
      if (element.genero === selectedOption) return element;
    });

    return selectedOption.length ? filteredElements.length : 0; // Retorna la cantidad de citas
  };

  const calculateSpecialtyElements = (elements) => {
    // Filtrar las citas en los últimos 7 días
    const lastElements = elements.filter((element) => {
      if (element.especialidad === selectedOption) return element;
    });

    return selectedOption.length ? lastElements.length : 0; // Retorna la cantidad de citas
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  
  const generateSpecialtiesChart = () => {
    return [selectedOption, 'Otros']
  };

  
  const generateDateRangeChart = (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const dateRange = [];
  
    // Iteramos desde la fecha de inicio hasta la fecha final, agregando cada fecha al array
    let currentDate = startDate;
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      dateRange.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day'); // Suma un día
    }
  
    return dateRange;
  }

  const generateLastDatesChart = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < selectedOption; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Formatear la fecha a "YYYY-MM-DD"
      const dia = date.getDate().toString().padStart(2, '0');
      const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
      const anio = date.getFullYear();
      
      dates.push(`${anio}-${mes}-${dia}`);
    }

    return dates;
  }

  useEffect(() => {
    setFilteredElements(
      selectedOption === ""
        ? 0
        : entity === "appointments"
        ? calculateLastElements(elements)
        : (entity === "doctors" ? calculateSpecialtyElements(elements) : calculateGenreElements(elements))
    );

    
    setLabelsChart(
      selectedOption === ""
        ? 0
        : entity === "appointments"
        ? generateLastDatesChart()
        : generateSpecialtiesChart()
    );

    setPieChartsData({
        labels: [
          'Otros',
          'Filtrados',
        ],
        datasets: [{
          label: 'Doctores',
          data: [elements.filter(e => {
            if((entity === "doctors" && e.especialidad !== selectedOption) || (entity === "patients" && e.genero !== selectedOption)) return e
          }).length,elements.filter(e => {
            if((entity === "doctors" &&  e.especialidad === selectedOption) || (entity === "patients" && e.genero === selectedOption)) return e
          }).length],
          backgroundColor: [
            'rgb(228 228 231 / 1)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4
        }]
    })
  }, [selectedOption]);

  useEffect(() => {
    setLineChartsData(
      {
        labels: labelsChart,
        datasets: [
          {
            label: '# de citas',
            data: labelsChart.length ? labelsChart.map(e => {
              return elements.filter(i => {
                if(i.fecha === e) return i
              }).length
            }) : [],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
    })
  }, [labelsChart]);
  
  useEffect(() => {
    const [start, end] = dateRange;
    const formattedStart = start ? dayjs(start).format('YYYY/MM/DD') : '';
    const formattedEnd = end ? dayjs(end).format('YYYY/MM/DD') : '';
    setLabelsChart(entity === "appointments" && filterType == 'daterange'
        ? generateDateRangeChart(formattedStart, formattedEnd)
        : []
    );
  }, [dateRange]);

  useEffect(() => {
    setOptions(
      entity === "appointments"
        ? [7, 15, 30]
        : (entity === "doctors" ? ["Cardiología", "Pediatría", "Odontología"] : ["Masculino", "Femenino"])
    );
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between border-b-2 border-gray-200 pb-2">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">
            {elements.length}
          </h5>
          <p className="text-xs font-normal text-gray-500 ">{title}</p>
        </div>
      </div>
        <div className="flex flex-row justify-between py-2">
          <div className="w-1/3 flex justify-center items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center">
            {filteredElements} elementos
          </div>
          <div className="w-3/4">
          {
            filterType === 'select' && (
              <select
                className="appearance-none w-full py-1 px-2 bg-gray-200 rounded-md"
                name="whatever"
                id="frm-whatever"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="''">
                  {entity === "appointments"
                    ? "Filtrar por últimos días"
                    : "Filtrar por especialidad"}
                </option>
                {options.map((value, index) => (
                  <option key={index} value={value}>
                    {value} {entity === "appointments" ? " días" : ""}
                  </option>
                ))}
              </select>
            )
          }
          {
            filterType === 'daterange' && (
              <DateRangePicker
                startText="Inicio"
                endText="Fin"
                value={dateRange}
                onChange={(newDateRange) => {
                  setDateRange(newDateRange);
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}>a</Box>
                    <TextField {...endProps} />
                  </>
                )}
              />
            )
          }
          </div>
        </div>
      {/* border */}
      <div>
        {
          entity === "appointments" ? 
          (<Chart type='line' data={lineChartsData} />) :
          (<Chart type='pie' data={pieChartsData} />)
        }      
      </div> 
    </div>
  );
}
