import { configureStore } from '@reduxjs/toolkit';
import tabsReducer from './features/tabsSlice';
import doctorsReducer from './features/doctorsSlice';
import patientsReducer from './features/patientsSlice';
import appointmentsReducer from './features/appointmentsSlice';

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    doctors: doctorsReducer,
    patients: patientsReducer,
    appointments: appointmentsReducer,
  },
});

export default store;