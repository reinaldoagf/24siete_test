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
    <div>
      <h2>Appointments List</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            Appointment with Doctor ID {appointment.doctor_id} for Patient ID {appointment.paciente_id} - Status: {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
