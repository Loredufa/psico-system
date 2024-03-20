import { createSlice } from "@reduxjs/toolkit";

export const ingresoSlice = createSlice({
  name: 'ingresos',
  initialState: {
    ingreso_list: [], // Array vacío
    message: null, 
  },
  reducers: {
    setIngresoList: (state, action) => {
      state.ingreso_list = action.payload;
    },
    addIngreso: (state, action) => {
      state.message = action.payload.message;
    },
    deleteIngreso: (state, action) => {
      state.message = action.payload.message;  
    },
    editIngreso: (state, action) => {
      state.message = action.payload.message;      
    },
    clearMessage: (state) => {
      state.message = ''; // Limpia el mensaje del estado
    },
  }
});

export const { setIngresoList, addIngreso, deleteIngreso, editIngreso, clearMessage } = ingresoSlice.actions;
export default ingresoSlice.reducer;