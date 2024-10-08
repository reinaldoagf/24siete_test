// src/features/patientsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch patients
export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
  const response = await axios.get('http://localhost:3000/pacientes');
  return response.data;
});

const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    patients: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default patientsSlice.reducer;
