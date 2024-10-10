import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk para hacer el login
/* export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      console.log({response})
      return response.data     
      // Se espera que el servidor devuelva un token o la información del usuario
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
 */

export const signupUser = createAsyncThunk('auth/signupUser', async (credentials) => {
  const response = await axios.post('http://localhost:3000/users', {...credentials}); // Endpoint del signup
  return response.data;
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  const response = await axios.get('http://localhost:3000/users');
  return  response.data
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    error: null,
    status: 'idle',
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.id;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error de autenticación';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const find = action.payload.find(e => e.email === action.meta.arg.email && e.password === action.meta.arg.password)
        state.token = find ? find.token : null;
        state.user = find ? find : null;
        state.error = find ? null : 'Error de autenticación, usuario no registrado';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error de autenticación';
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
