import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { createBill, editBill } from '../features/gastos/actions';

function GastoForm() {
  const [gasto, setGasto] = useState({
    fecha: null, 
    descripcion: '',
    monto: '',
    mensual: false, 
    diferido: false, 
  })

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gastos = useSelector(state => state.gastos.gasto_list);

  useEffect(() => {
    if (id && gastos.length > 0) {
      const gastoEncontrado = gastos.find(g => g.id === id);
      if (gastoEncontrado) {
        const formattedDate = new Date(gastoEncontrado.fecha).toLocaleDateString('en-CA');
        setGasto({
          ...gastoEncontrado,
          fecha: formattedDate,
          mensual: Boolean(gastoEncontrado.mensual), // Convertir a booleano
          diferido: Boolean(gastoEncontrado.diferido), // Convertir a booleano
        });
      } else {
        console.log("Gasto no encontrado");
      }
    } else {
      console.log("ID no encontrado o gastos no cargados");
    }
  }, [id, gastos]);

  const handleChange = (name, value) => {
    if (name === 'mensual' || name === 'diferido') {
      // Si es un checkbox, establece el valor como true si está marcado, de lo contrario, false
      setGasto({
        ...gasto,
        [name]: value.target.checked
      });
    } else {
      // Si no es un checkbox, actualiza el valor normalmente
      setGasto({
        ...gasto,
        [name]: value
      });
    } 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editBill({
        id,
        gasto: {
          ...gasto,
          fecha: `${gasto.fecha.split('-')[2]}/${gasto.fecha.split('-')[1]}/${gasto.fecha.split('-')[0]}`
        }
      }));
    } else {
      dispatch(createBill({
        ...gasto,
        id: uuid(),
        fecha: `${gasto.fecha.split('-')[2]}/${gasto.fecha.split('-')[1]}/${gasto.fecha.split('-')[0]}`
      }));
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-1">
      <h3 className="mb-2">Cargando mis gastos</h3>
      <label htmlFor="fecha" className="block text-sm font-bold mb-2">Fecha del gasto:</label>
      <input
        type="date"
        name='fecha'
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        onChange={(e) => handleChange('fecha', e.target.value)}
        value={gasto.fecha}
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
      <label htmlFor="mensual" className="block text-sm font-bold mb-2">Mensual:</label>
      <input
        name="mensual"
        type="checkbox"
        checked={gasto.mensual}
        onChange={(e) => handleChange('mensual', e)} // Pasar el evento completo
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <label htmlFor="diferido" className="block text-sm font-bold mb-2">Diferido:</label>
      <input
        name="diferido"
        type="checkbox"
        checked={gasto.diferido}
        onChange={(e) => handleChange('diferido', e)}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <button type="submit" className="bg-indigo-600 py-1 px-2">Guardar</button>
    </form>
  );
}

export default GastoForm;

