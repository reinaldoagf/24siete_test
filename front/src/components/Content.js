import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../redux/features/appointmentsSlice";
import { fetchDoctors } from "../redux/features/doctorsSlice";
import { fetchPatients } from "../redux/features/patientsSlice";
import SidebarRight from "./SidebarRight";
import ArtworkSelector from "./ArtworkSelector";
import KeyPerformanceIndicator from "./KeyPerformanceIndicator";

export default function Content() {
  const dispatch = useDispatch();
  /* tabs */
  const selectedTab = useSelector((state) => state.tabs.selectedTab);
  /* citas */
  const appointments = useSelector((state) => state.appointments.appointments);
  const appointmentsStatus = useSelector((state) => state.appointments.status);
  /* const appontmentsError = useSelector((state) => state.appointments.error); */

  /* doctores */
  const doctors = useSelector((state) => state.doctors.doctors);
  const doctorsStatus = useSelector((state) => state.doctors.status);
  /* const error = useSelector((state) => state.doctors.error); */

  /* pacientes */
  const patients = useSelector((state) => state.patients.patients);
  const patientsStatus = useSelector((state) => state.patients.status);
  /* const error = useSelector((state) => state.patients.error); */

  useEffect(() => {
    if (appointmentsStatus === "idle") {
      dispatch(fetchAppointments());
    }
    if (doctorsStatus === "idle") {
      dispatch(fetchDoctors());
    }
    if (patientsStatus === "idle") {
      dispatch(fetchPatients());
    }
  }, [appointmentsStatus, doctorsStatus, patientsStatus, dispatch]);

  /*  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>; */
  /* citas */

  return (
    <>
      <div className="flex">
        <div className="w-3/4">
          <div className="">
            <h1 className="text-2xl font-bold px-3 mt-3">Dashboard</h1>

            <div className="flex flex-col md:flex-row justify-between px-3 mt-3">
              <h2 className="text-zinc-500">Datos clave de rendimiento</h2>
              <ul className="inline-flex space-x-3 ">
                {["Todos", "Pacientes", "Citas", "Doctores"].map(
                  (text, index) => (
                    <ArtworkSelector key={text} text={text} index={index} />
                  )
                )}
              </ul>
            </div>
          </div>
          {(selectedTab.toLowerCase() === "todos" ||
            selectedTab.toLowerCase() === "citas") && (
            <>
              <div className="py-4 grid gap-4 md:grid-cols-3 grid-cols-1">
                <KeyPerformanceIndicator
                  data={{
                    title: "Total de citas",
                    entity: "appointments",
                    filterType: "daterange",
                    status:
                      appointmentsStatus /*  (status === "loading") (status === "failed") */,
                    elements: appointments,
                  }}
                />
                <KeyPerformanceIndicator
                  data={{
                    title: "Total de citas aprobadas",
                    entity: "appointments",
                    filterType: "select",
                    status:
                      appointmentsStatus /*  (status === "loading") (status === "failed") */,
                    elements: appointments.filter(
                      (e) => e.status === "aprobado"
                    ),
                  }}
                />
                <KeyPerformanceIndicator
                  data={{
                    title: "Total de citas pendientes",
                    entity: "appointments",
                    filterType: "select",
                    status:
                      appointmentsStatus /*  (status === "loading") (status === "failed") */,
                    elements: appointments.filter(
                      (e) => e.status === "pendiente por aprobar"
                    ),
                  }}
                />
              </div>
            </>
          )}
          <div className="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
            {(selectedTab.toLowerCase() === "todos" ||
              selectedTab.toLowerCase() === "doctores") && (
              <>
                <KeyPerformanceIndicator
                  data={{
                    title: "Total de doctores",
                    entity: "doctors",
                    filterType: "select",
                    status:
                      doctorsStatus /*  (status === "loading") (status === "failed") */,
                    elements: doctors,
                  }}
                />
              </>
            )}
            {(selectedTab.toLowerCase() === "todos" ||
              selectedTab.toLowerCase() === "pacientes") && (
              <>
                <KeyPerformanceIndicator
                  data={{
                    title: "Total de pacientes",
                    entity: "patients",
                    filterType: "select",
                    status:
                      patientsStatus /*  (status === "loading") (status === "failed") */,
                    elements: patients,
                  }}
                />
              </>
            )}
          </div>
        </div>
        <div className="w-1/4">
          <SidebarRight />
        </div>
      </div>
    </>
  );
}
