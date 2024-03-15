import axios from 'axios';
import { addGasto, deleteGasto, editGasto, setGastoList } from './gastoSlice';
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
        console.log(response.data)
        const gastos_list = response.data;

        return dispatch(setGastoList(gastos_list));
    };
}

export const editBill = ({ id, gasto }) => {
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
    return async (dispatch) => {
        try {
            // Realiza una solicitud HTTP para crear un nuevo usuario en el servidor
            const response = await axios.post(`${url_back}/bill`, gasto, {
                headers: {
                    "x-access-token": `${token}`,
                    "Content-Type": `${content_type}`
                },
            });
            // Despacha una acción para agregar el nuevo usuario al estado de usuarios en el store
            return dispatch(addGasto(response.data));
        } catch (error) {
            // Maneja errores y despacha una acción de error si es necesario
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
