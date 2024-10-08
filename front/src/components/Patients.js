import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '../redux/features/patientsSlice';

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
    <div>
      <h2>Patients List</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>{patient.nombre} - {patient.edad} años</li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
