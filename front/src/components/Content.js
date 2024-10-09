import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../redux/features/appointmentsSlice";
import ArtworkSelector from "./ArtworkSelector";
import KeyPerformanceIndicator from "./KeyPerformanceIndicator";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";



export default function Content() {
  const dispatch = useDispatch();

  const appointments = useSelector((state) => state.appointments.appointments);
  const status = useSelector((state) => state.appointments.status);
  const error = useSelector((state) => state.appointments.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <div className="">
        <h1 className="text-2xl font-bold px-3 mt-3">Dashboard</h1>

        <div className="flex flex-col md:flex-row justify-between px-3 mt-3">
          <h2 className="text-zinc-500">Datos clave de rendimiento</h2>
          <ul className="inline-flex space-x-3 ">
            {["Todos", "Pacientes", "Citas", "Doctores"].map((text, index) => (
              <ArtworkSelector key={text} text={text} index={index} />
            ))}
          </ul>
        </div>
      </div>
      <div className="py-4 grid gap-4 grid-cols-2">
        <KeyPerformanceIndicator
          data={{
            title: "Total de citas aprobadas",
            appointments: appointments.filter((e) => e.status === "aprobado"),
          }}
        />
        <KeyPerformanceIndicator
          data={{
            title: "Total de citas aprobadas",
            appointments: appointments.filter((e) => e.status === "pendiente por aprobar"),
          }}
        />
      </div>
      {/* <div>
      <Chart type='line' data={{
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}} />
      </div> */}
    </>
  );
}
