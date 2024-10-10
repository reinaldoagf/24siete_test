import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Async thunk to register appointment
export const registerAppointment = createAsyncThunk('appointments/registerAppointment', async (data) => {
  const response = await axios.post('http://localhost:3000/citas', data);
  return response.data;
});

// Async thunk to fetch appointments
export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
  const response = await axios.get('http://localhost:3000/citas?_embed=paciente&_embed=doctore');
  return response.data;
});

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(registerAppointment.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(registerAppointment.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(registerAppointment.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Error de autenticación';
    })
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default appointmentsSlice.reducer;
