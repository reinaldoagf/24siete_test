import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../redux/features/appointmentsSlice';

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);
  const status = useSelector((state) => state.appointments.status);
  const error = useSelector((state) => state.appointments.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <>
      <div className="">
        <h1 className="text-2xl font-bold px-3 mt-3">Citas</h1>
      </div>

      <hr className="my-2 text-zinc-700" />

      <div className="relative overflow-x-auto p-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {["Fecha", "Hora", "Status"].map((value, index) => (
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
    </>
  );

};

export default Appointments;
