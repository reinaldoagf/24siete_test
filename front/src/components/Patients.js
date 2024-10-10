import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '../redux/features/patientsSlice';
import Layout from "./Layout";

const Patients = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const status = useSelector((state) => state.patients.status);
  const error = useSelector((state) => state.patients.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPatients());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  
  return (
    <Layout>
      <div className="">
        <h1 className="text-2xl font-bold px-3 mt-3">Pacientes</h1>
      </div>

      <hr className="my-2 text-zinc-700" />

      <div className="relative overflow-x-auto p-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {["Nombre", "Edad", "Genero", "Telefono", "Direccion"].map((value, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patients.map((element) => (
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
                <td className="px-6 py-4">{element.edad}</td>
                <td className="px-6 py-4">{element.genero}</td>
                <td className="px-6 py-4">{element.telefono}</td>
                <td className="px-6 py-4">{element.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Patients;
