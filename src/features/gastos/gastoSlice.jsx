import { createSlice } from "@reduxjs/toolkit";

export const gastoSlice = createSlice({
  name: 'gastos',
  initialState: {
    gasto_list: [], // Array vacío
    message: null, 
  },
  reducers: {
    setGastoList: (state, action) => {
      state.gasto_list = action.payload;
    },
    addGasto: (state, action) => {
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
  }
});

export const { addGasto, deleteGasto, editGasto, setGastoList, clearMessage } = gastoSlice.actions;
export default gastoSlice.reducer;