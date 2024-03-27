import { createSlice } from "@reduxjs/toolkit";

export const ingresoSlice = createSlice({
  name: 'ingresos',
  initialState: {
    ingreso_list: [], // Array vacío
    message: null, 
    detail_ingreso: [], 
  },
  reducers: {
    setIngresoList: (state, action) => {
      state.ingreso_list = action.payload;
    },
    setDetalleIngresoList: (state, action) => {
      state.detail_ingreso = action.payload;
    },
    addIngreso: (state, action) => {
      state.message = action.payload.message;
    },
    addDetailIngreso: (state, action) => {
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

export const { setIngresoList, addIngreso, deleteIngreso, editIngreso, clearMessage, addDetailIngreso, setDetalleIngresoList } = ingresoSlice.actions;
export default ingresoSlice.reducer;