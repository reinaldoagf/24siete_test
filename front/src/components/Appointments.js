import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Button,
  lightColors,
  darkColors,
} from "react-floating-action-button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { fetchAppointments, registerAppointment } from "../redux/features/appointmentsSlice";
import Layout from "./Layout";

const Appointments = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");

  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);
  const status = useSelector((state) => state.appointments.status);
  const error = useSelector((state) => state.appointments.error);
  
  const doctors = useSelector((state) => state.doctors.doctors);
  const patients = useSelector((state) => state.patients.patients);


  const convertTo12HourFormat = async (time24) => {
    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours, 10);    
    const ampm = hours >= 12 ? 'PM' : 'AM';    
    hours = hours % 12 || 12;    
    return `${hours}:${minutes} ${ampm}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const time12 = await convertTo12HourFormat(time)
    console.log({time})
    console.log({time12})
    if(date && time12 && patient && doctor) {
      await dispatch(registerAppointment({ 
        fecha: date, 
        hora: time12,
        pacienteId: patient,
        doctoreId: doctor,
        status: "pendiente por aprobar" 
      }));
  
      await dispatch(fetchAppointments());
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAppointments());
    }
    setOpen(false)
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Layout>
      <div className="">
        <h1 className="text-2xl font-bold px-3 mt-3">Citas</h1>
      </div>

      <hr className="my-2 text-zinc-700" />

      <div className="relative overflow-x-auto p-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {["Fecha", "Doctor","Paciente", "Hora", "Status"].map((value, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.map((element) => (
              <tr
                key={element.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {element.fecha}
                </th>
                <td className="px-6 py-4">{element.doctore?.nombre}</td>
                <td className="px-6 py-4">{element.paciente?.nombre}</td>
                <td className="px-6 py-4">{element.hora}</td>
                <td className="px-6 py-4">
                  <span
                    className={`${
                      element.status === "aprobado"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    } text-xs font-medium me-2 px-2.5 py-0.5 rounded`}
                  >
                    {element.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h1 className="text-4xl text-center mb-12 font-thin">Registrar cita</h1>

          <div className="bg-white rounded-lg overflow-hidden ">
          <form className="py-2" onSubmit={handleSubmit}>
  

  {/* Fecha de la cita */}
  <div className="mb-5">
    <label
      htmlFor="date"
      className="block mb-2 text-sm font-medium text-gray-600"
    >
      Fecha de la cita
    </label>

    <input
      type="date"
      name="date"
      className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
      value={date} onChange={(e) => setDate(e.target.value)}
    />
  </div>

  {/* Hora de la cita */}
  <div className="mb-5">
    <label
      htmlFor="time"
      className="block mb-2 text-sm font-medium text-gray-600"
    >
      Hora de la cita
    </label>

    <input
      type="time"
      name="time"
      className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
      value={time} onChange={(e) => setTime(e.target.value)}
    />
  </div>

  {/* Selección de Doctor */}
  <div className="mb-5">
    <label
      htmlFor="doctor"
      className="block mb-2 text-sm font-medium text-gray-600"
    >
      Seleccionar Doctor
    </label>

    <select
      name="doctor"
      className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
      value={doctor} onChange={(e) => setDoctor(e.target.value)}
    >
      <option value="">Seleccione un Doctor</option>
      {doctors.map((element, index) => (
        <option key={index} value={element.id}>{element.nombre}</option>
      ))}
      
      
    </select>
  </div>

  {/* Selección de Paciente */}
  <div className="mb-5">
    <label
      htmlFor="patient"
      className="block mb-2 text-sm font-medium text-gray-600"
    >
      Seleccionar Paciente
    </label>

    <select
      name="patient"
      className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
      value={patient} onChange={(e) => setPatient(e.target.value)}
    >
      <option value="">Seleccione un Paciente</option>
      {patients.map((element, index) => (
        <option key={index} value={element.id}>{element.nombre}</option>
      ))}
    </select>
  </div>

  {/* Botón de enviar */}
  <button
    className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
    type="submit"
    disabled={status === "loading"}
  >
    {status === "loading" ? "Registrando cita..." : "Registrar Cita"}
  </button>
</form>

              {error && (
                <div
                  className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Error!</span> {error}
                  </div>
                </div>
              )}
          </div>
        </Box>
      </Modal>

      <Container styles={{ bottom: "2rem", right: "2rem" }}>
        <Button
          tooltip="Registrar nueva cita"
          icon={"fas fa-plus"}
          rotate={true}
          styles={{
            backgroundColor: darkColors.lighterRed,
            color: lightColors.white,
          }}
          onClick={handleOpen}
        />
      </Container>
    </Layout>
  );
};

export default Appointments;
