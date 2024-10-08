import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './features/doctorsSlice';
import patientsReducer from './features/patientsSlice';
import appointmentsReducer from './features/appointmentsSlice';

export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    patients: patientsReducer,
    appointments: appointmentsReducer,
  },
});

export default store;