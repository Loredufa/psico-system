import { configureStore } from '@reduxjs/toolkit';
import gastoReducer from '../features/gastos/gastoSlice';

const store = configureStore({
  reducer:{
  gastos : gastoReducer
  }
})

export { store };
