import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { createBill, editBill } from '../features/gastos/actions';


function GastoForm() {
  const [gasto, setGasto] = useState({
    fecha: new Date(), // Asigna una fecha por defecto si no tienes una fecha preexistente
    descripcion: '',
    monto: ''
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gastos = useSelector(state => state.gastos.gasto_list);

  useEffect(() => {
    if (id && gastos.length > 0) {
      const gastoEncontrado = gastos.find(g => g.id === id);
      if (gastoEncontrado) {
        setGasto({
          ...gastoEncontrado,
          fecha: new Date(gastoEncontrado.fecha) // Formatea la fecha al cargarla del estado
        });
      } else {
        console.log("Gasto no encontrado");
      }
    } else {
      console.log("ID no encontrado o gastos no cargados");
    }
  }, [id, gastos]);

  const handleChange = (name, value) => {
    setGasto({
      ...gasto,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editBill({ id, gasto }));
    } else {
      dispatch(createBill({
        ...gasto,
        id: uuid(),
        fecha: format(gasto.fecha, 'dd/MM/yyyy') // Formatea la fecha antes de enviarla al servidor
      }));
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-1">
      <h3 className="mb-2">Cargando mis gastos</h3>
      <label htmlFor="fecha" className="block text-sm font-bold mb-2">Fecha del gasto:</label>
      <DatePicker
        selected={gasto.fecha}
        onChange={(date) => handleChange('fecha', date)}
        dateFormat="dd/MM/yyyy"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <label htmlFor="descripcion" className="block text-sm font-bold mb-2">Descripción:</label>
      <input
        name="descripcion"
        type="text"
        placeholder="Descripción"
        value={gasto.descripcion}
        onChange={(e) => handleChange('descripcion', e.target.value)}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <label htmlFor="monto" className="block text-sm font-bold mb-2">Importe en $</label>
      <input
        name="monto"
        type="number"
        placeholder="Monto"
        value={gasto.monto}
        onChange={(e) => handleChange('monto', e.target.value)}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <button type="submit" className="bg-indigo-600 py-1 px-2">Guardar</button>
    </form>
  );
}

export default GastoForm;
