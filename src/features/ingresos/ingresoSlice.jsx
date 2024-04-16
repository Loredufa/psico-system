import { createSlice } from "@reduxjs/toolkit";

export const ingresoSlice = createSlice({
  name: 'ingresos',
  initialState: {
    ingreso_list: [], // Array vacío
    message: null, 
    detail_ingreso: [], 
    total_ingresoxmes: [], 
    current_ingreso: {},
    ingreso_pendiente:{},
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
    setIngresoxmes: (state, action) => {
      state.total_ingresoxmes = action.payload; 
    },
    setCurrentIngreso: (state, action) => {
      state.current_ingreso = action.payload; 
    },
    setIngresoPendiente: (state, action) => {
      state.ingreso_pendiente = action.payload; 
    },
  }
});

export const { setIngresoList, addIngreso, deleteIngreso, editIngreso, clearMessage, addDetailIngreso, setDetalleIngresoList, setIngresoxmes, setCurrentIngreso, setIngresoPendiente } = ingresoSlice.actions;
export default ingresoSlice.reducer;