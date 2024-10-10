import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../redux/features/doctorsSlice";

const Doctors = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors.doctors);
  const status = useSelector((state) => state.doctors.status);
  const error = useSelector((state) => state.doctors.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDoctors());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <div className="">
        <h1 className="text-2xl font-bold px-3 mt-3">Doctores</h1>
      </div>

      <hr className="my-2 text-zinc-700" />

      <div className="relative overflow-x-auto p-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {["Nombre", "Especialidad", "Status"].map((value, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doctors.map((element) => (
              <tr
                key={element.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {element.nombre}
                </th>
                <td className="px-6 py-4">{element.especialidad}</td>
                <td className="px-6 py-4">
                  <span
                    className={`${
                      element.status === "verificado"
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

export default Doctors;
