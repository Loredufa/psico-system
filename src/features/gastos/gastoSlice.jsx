import { createSlice } from "@reduxjs/toolkit";

export const gastoSlice = createSlice({
  name: 'gastos',
  initialState: {
    gasto_list: [], 
    message: null, 
    detail_gasto: [], 
    total_gastoxmes: [], 
    current_gasto: {},
    current_diferido: {},
    response_gpt: ""
  },
  reducers: {
    setGastoList: (state, action) => {
      state.gasto_list = action.payload;
    },
    setDetalleGastoList: (state, action) => {
      state.detail_gasto = action.payload;
    },
    addGasto: (state, action) => {
      state.message = action.payload.message;
    },
    addDetailGasto: (state, action) => {
      state.message = action.payload.message;
    },
    deleteGasto: (state, action) => {
      state.message = action.payload.message;  
    },
    editGasto: (state, action) => {
      state.message = action.payload.message;      
    },
    clearMessage: (state) => {
      state.message = ''; // Limpia el mensaje del estado
    },
    setGastoxmes: (state, action) => {
      state.total_gastoxmes = action.payload; 
    },
    setCurrentGasto: (state, action) => {
      state.current_gasto = action.payload; 
    },
    setCurrentDiferido: (state, action) => {
      state.current_diferido = action.payload; 
    },
    setResponseGpt: (state, action) => {
      state.response_gpt = action.payload; 
    },
  }
});

export const {  addGasto, 
                deleteGasto, 
                editGasto, 
                setGastoList, 
                clearMessage, 
                setDetalleGastoList, 
                addDetailGasto, 
                setGastoxmes,
                setCurrentGasto,
                setCurrentDiferido,
                setResponseGpt } = gastoSlice.actions;

export default gastoSlice.reducer;