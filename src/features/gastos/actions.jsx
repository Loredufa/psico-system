import axios from 'axios';
import {
    addDetailGasto, addGasto, deleteGasto, editGasto, setCurrentDiferido, setCurrentGasto,
    setDetalleGastoList, setGastoList, setGastoxmes, setResponseGpt
} from './gastoSlice';
const url_back = import.meta.env.VITE_BACKEND_URL;
const token = import.meta.env.VITE_TOKEN;
const content_type = import.meta.env.VITE_CONTENT_TYPE;


export function getBills() {
    return async function (dispatch) {
        let response = await axios.get(`${url_back}/bill`, {
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": `${content_type}`
            },
        });
        const gastos_list = response.data;
        return dispatch(setGastoList(gastos_list));
    };
}

export function getDetailBills() {
    return async function (dispatch) {
        let response = await axios.get(`${url_back}/detail/b_detail`, {
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": `${content_type}`
            },
        });
        const detail_gasto = response.data;
        return dispatch(setDetalleGastoList(detail_gasto));
    };
}

export const editBill = (id, gasto ) => {
    return async (dispatch) => {
        try {
            // Realiza una solicitud HTTP para actualizar el usuario en el servidor
            const response = await axios.put(`${url_back}/bill/${id}`, gasto, {
                headers: {
                    "x-access-token": `${token}`,
                    "Content-Type": `${content_type}`
                },
            });
            // Despacha una acción para actualizar el estado de usuarios en el store
            return dispatch(editGasto(response.data));
        } catch (error) {
            // Maneja errores y despacha una acción de error si es necesario
            console.log(error);
            return null;
        }
    };
};

export const createBill = (gasto) => {
    console.log('SOY GASTO EN ACTION', gasto);
    return async (dispatch) => {
        // Elimina la propiedad circular si existe
        if (gasto.inputElementProperty) {
            delete gasto.inputElementProperty;
        }

        try {
            // Realiza una solicitud HTTP para crear un nuevo gasto en el servidor
            const response = await axios.post(`${url_back}/bill/bill`, gasto, {
                headers: {
                    "x-access-token": `${token}`,
                    "Content-Type": `${content_type}`
                },
            });
            console.log(response.data);
            // Despacha una acción para agregar el nuevo gasto al estado de gastos en el store
            return dispatch(addGasto(response.data));
        } catch (error) {
            // Maneja errores y despacha una acción de error si es necesario
            console.log(error);
            return null;
        }
    };
};


export const createDetailBill = (descripcion) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${url_back}/detail/b_post`, { descripcion }, {
                headers: {
                    "x-access-token": token,
                    "Content-Type": content_type
                },
            });
            return dispatch(addDetailGasto(response.data));
        } catch (error) {
            console.log(error);
            return null;
        }
    };
};


export const deleteBills = (id) => {
    return async (dispatch) => {
        try {
            // Realiza una solicitud HTTP para eliminar el usuario en el servidor
            const response = await axios.delete(`${url_back}/bill/${id}`, {
                headers: {
                    "x-access-token": `${token}`,
                    "Content-Type": `${content_type}`
                },
            });
            // Despacha una acción para eliminar el usuario del estado de usuarios en el store
            return dispatch(deleteGasto(response.data));
        } catch (error) {
            // Maneja errores y despacha una acción de error si es necesario
            console.log(error);
            return null;
        }
    };
};

export function getBillsxMonth() {
    return async function (dispatch) {
        let response = await axios.get(`${url_back}/balance/bill`, {
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": `${content_type}`
            }, 
        });
        const total_gastoxmes = response.data;
        return dispatch(setGastoxmes(total_gastoxmes));
    };
}

export function getCurrentBill() {
    return async function (dispatch) {
        let response = await axios.get(`${url_back}/balance/currentbill`, {
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": `${content_type}`
            }, 
        });
        const total_gastomensual = response.data;
        return dispatch(setCurrentGasto(total_gastomensual));
    };
}

export function getCurrentDiferido() {
    return async function (dispatch) {
        let response = await axios.get(`${url_back}/balance/diferido`, {
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": `${content_type}`
            }, 
        });
        const total_diferido = response.data;
        return dispatch(setCurrentDiferido(total_diferido));
    };
}

export const addGpt = (recognizedText) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(
          `${url_back}/model`,
          { text: recognizedText },
          {
            headers: {
              "x-access-token": token,
              "Content-Type": content_type
            }
          }
        );
        dispatch(setResponseGpt(response.data));
      } catch (error) {
        console.log(error);
        return null;
      }
    };
  };
