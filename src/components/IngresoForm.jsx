import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { createIncome, editIncome } from '../features/ingresos/actions';

function IngresoForm() {
    const [ingreso, setIngreso] = useState({
        fecha: null,
        descripcion: '',
        monto: '',
        mensual: false, 
        paciente: false,
        cobrado: false,
        cancelado: false,
        facturado: false
    });

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingresos = useSelector(state => state.ingresos.ingreso_list);

    useEffect(() => {
        if (id && ingresos.length > 0) {
            const ingresoEncontrado = ingresos.find(g => g.id === id);
            if (ingresoEncontrado) {
                const formattedDate = new Date(ingresoEncontrado.fecha).toLocaleDateString('en-CA');
                setIngreso({
                    ...ingresoEncontrado,
                    fecha: formattedDate,
                    mensual: Boolean(ingresoEncontrado.mensual), // Convertir a booleano
                    cancelado: Boolean(ingresoEncontrado.cancelado), 
                    paciente: Boolean(ingresoEncontrado.paciente), 
                    cobrado: Boolean(ingresoEncontrado.cobrado), 
                    facturado: Boolean(ingresoEncontrado.facturado), 
                });
            } else {
                console.log("Ingreso no encontrado");
            }
        } else {
            console.log("ID no encontrado o ingreso no cargados");
        }
    }, [id, ingresos]);

    const handleChange = (name, value) => {
        if (name === 'mensual' || name === 'cancelado' || name === 'paciente' || name === 'cobrado' || name === 'facturado') {
          // Si es un checkbox, establece el valor como true si está marcado, de lo contrario, false
          setIngreso({
            ...ingreso,
            [name]: value.target.checked
          });
        } else {
          // Si no es un checkbox, actualiza el valor normalmente
          setIngreso({
            ...ingreso,
            [name]: value
          });
        } console.log('SOY EL GASTO', ingreso)
      };
    ;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(editIncome({
                id,
                ingreso: {
                    ...ingreso,
                    fecha: `${ingreso.fecha.split('-')[2]}/${ingreso.fecha.split('-')[1]}/${ingreso.fecha.split('-')[0]}` // Formatea la fecha como día/mes/año antes de enviarla al servidor
                }
            }));
        } else {
            dispatch(createIncome({
                ...ingreso,
                id: uuid(),
                fecha: `${ingreso.fecha.split('-')[2]}/${ingreso.fecha.split('-')[1]}/${ingreso.fecha.split('-')[0]}` // Formatea la fecha como día/mes/año antes de enviarla al servidor
            }));
        }
        navigate('/income');
    };


    return (
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-1">
            <h3 className="mb-2">Cargando mis ingresos</h3>
            <label htmlFor="fecha" className="block text-sm font-bold mb-2">Fecha del gasto:</label>
            <input
                type="date"
                name='fecha'
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
                onChange={(e) => handleChange('fecha', e.target.value)}
                value={ingreso.fecha}
            />
            <label htmlFor="descripcion" className="block text-sm font-bold mb-2">Descripción:</label>
            <input
                name="descripcion"
                type="text"
                placeholder="Descripción"
                value={ingreso.descripcion}
                onChange={(e) => handleChange('descripcion', e.target.value)}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />
            <label htmlFor="monto" className="block text-sm font-bold mb-2">Importe en $</label>
            <input
                name="monto"
                type="number"
                placeholder="Monto"
                value={ingreso.monto}
                onChange={(mensuale) => handleChange('monto', e.target.value)}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />
            <label htmlFor="paciente" className="block text-sm font-bold mb-2">Es paciente?:</label>
            <input
                name="paciente"
                type="checkbox"
                checked={ingreso.paciente}
                onChange={(e) => handleChange('paciente', e)} // Pasar el evento completo
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />
            <label htmlFor="mensual" className="block text-sm font-bold mb-2">Mensual:</label>
            <input
                name="mensual"
                type="checkbox"
                checked={ingreso.mensual}
                onChange={(e) => handleChange('mensual', e)} // Pasar el evento completo
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />
            <label htmlFor="cobrado" className="block text-sm font-bold mb-2">Cobrado?:</label>
            <input
                name="cobrado"
                type="checkbox"
                checked={ingreso.cobrado}
                onChange={(e) => handleChange('cobrado', e)}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />
            <label htmlFor="cancelado" className="block text-sm font-bold mb-2">Cancelado?:</label>
            <input
                name="cancelado"
                type="checkbox"
                checked={ingreso.cancelado}
                onChange={(e) => handleChange('cancelado', e)}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />
            <label htmlFor="facturado" className="block text-sm font-bold mb-2">Facturado:</label>
            <input
                name="facturado"
                type="checkbox"
                checked={ingreso.facturado}
                onChange={(e) => handleChange('facturado', e)}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />
            <button type="submit" className="bg-indigo-600 py-1 px-2">Guardar</button>
        </form>
    );
}

export default IngresoForm;

