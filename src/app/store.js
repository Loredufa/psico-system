import { configureStore } from '@reduxjs/toolkit';
import gastoReducer from '../features/gastos/gastoSlice';
import ingresoReducer from '../features/ingresos/ingresoSlice';

const store = configureStore({
  reducer:{
  gastos : gastoReducer,
  ingresos: ingresoReducer,
  }
})

export { store };

