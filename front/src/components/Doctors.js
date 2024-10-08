import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../redux/features/doctorsSlice';

const Doctors = () => {
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
    <div>
      <h2>Doctors List</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.nombre} - {doctor.especialidad} ({doctor.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
