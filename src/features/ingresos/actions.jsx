import axios from 'axios';
import { addIngreso, deleteIngreso, editIngreso, setIngresoList } from './ingresoSlice';
const url_back = import.meta.env.VITE_BACKEND_URL;
const token = import.meta.env.VITE_TOKEN;
const content_type = import.meta.env.VITE_CONTENT_TYPE;

export function getIncomes() {
    return async function (dispatch) {
        let response = await axios.get(`${url_back}/income`, {
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": `${content_type}`
            },
        });
        console.log(response.data)
        const ingreso_list = response.data;

        return dispatch(setIngresoList(ingreso_list));
    };
}

export const editIncome = ({ id, ingreso }) => {
    return async (dispatch) => {
        try {
            // Realiza una solicitud HTTP para actualizar el usuario en el servidor
            const response = await axios.put(`${url_back}/income/${id}`, ingreso, {
                headers: {
                    "x-access-token": `${token}`,
                    "Content-Type": `${content_type}`
                },
            });
            // Despacha una acción para actualizar el estado de usuarios en el store
            return dispatch(editIngreso(response.data));
        } catch (error) {
            // Maneja errores y despacha una acción de error si es necesario
            console.log(error);
            return null;
        }
    };
};

export const createIncome = (ingreso) => {
    return async (dispatch) => {
        try {
            // Realiza una solicitud HTTP para crear un nuevo usuario en el servidor
            const response = await axios.post(`${url_back}/income`, ingreso, {
                headers: {
                    "x-access-token": `${token}`,
                    "Content-Type": `${content_type}`
                },
            });
            // Despacha una acción para agregar el nuevo usuario al estado de usuarios en el store
            return dispatch(addIngreso(response.data));
        } catch (error) {
            // Maneja errores y despacha una acción de error si es necesario
            console.log(error);
            return null;
        }
    };
};

export const deleteIncome = (id) => {
    return async (dispatch) => {
        try {
            // Realiza una solicitud HTTP para eliminar el usuario en el servidor
            const response = await axios.delete(`${url_back}/income/${id}`, {
                headers: {
                    "x-access-token": `${token}`,
                    "Content-Type": `${content_type}`
                },
            });
            // Despacha una acción para eliminar el usuario del estado de usuarios en el store
            return dispatch(deleteIngreso(response.data));
        } catch (error) {
            // Maneja errores y despacha una acción de error si es necesario
            console.log(error);
            return null;
        }
    };
};
