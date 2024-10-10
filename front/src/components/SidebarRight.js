import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../redux/features/doctorsSlice';

export default function SidebarRight() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors.doctors);
  const status = useSelector((state) => state.doctors.status);
  const error = useSelector((state) => state.doctors.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDoctors());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
    return (
      <div className="p-3 shrink-0 md:sticky md:top-16 shrink-0 h-full">
        <h2 className="text-xl font-semibold">Doctores</h2>
        <ul className="mt-3 space-y-3">
          {doctors.map(({ nombre, especialidad, image }, index) => (
            <li
              className="bg-zinc-200 rounded-md p-2 flex shadow-lg"
              key={index}
            >
              <div className="ml-3">
                <h3 className="font-semibold">{nombre}</h3>
                <p className="text-sm text-zinc-400">{especialidad}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }