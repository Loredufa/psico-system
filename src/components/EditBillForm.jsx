import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createDetailBill, editBill } from '../features/gastos/actions';


function EditBillForm() {
  const [gasto, setGasto] = useState({
    id: '',
    fecha: '',
    descripcion: '',
    monto: '',
    mensual: false,
    diferido: false,
    fecha_dif: '',
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gastos = useSelector(state => state.gastos.gasto_list);
  const detalle = useSelector(state => state.gastos.detail_gasto);

  useEffect(() => {
    if (gastos.length > 0) {
      const gastoEncontrado = gastos.find(g => g.id === id);
      if (gastoEncontrado) {
        //const formattedDate = new Date(gastoEncontrado.fecha).toLocaleDateString('en-CA');
        setGasto({
          ...gastoEncontrado,
          // fecha: formattedDate,
          id: gastoEncontrado.id,
          fecha: gastoEncontrado.fecha,
          descripcion: gastoEncontrado.descripcion,
          monto: gastoEncontrado.monto,
          mensual: Boolean(gastoEncontrado.mensual),
          diferido: Boolean(gastoEncontrado.diferido),
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
        [name]: value && value.target ? value.target.checked : false
      });
    } else {
      // Si no es un checkbox, actualiza el valor normalmente
      setGasto({
        ...gasto,
        [name]: value
      });
    }
    console.log('SOY EL GASTO', gasto);
  };
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : detalle.filter(item =>
      item.descripcion.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = suggestion => suggestion.descripcion;

  const renderSuggestion = suggestion => (
    <div className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-600 hover:filter hover:brightness-90">
      {suggestion.descripcion}
    </div>
  );

  const handleSubmit = e => {
    e.preventDefault();
    const descripcion = gasto.descripcion.trim().toLowerCase();
    const existeDescripcion = detalle.some(item => item.descripcion.toLowerCase() === descripcion);
    if (!existeDescripcion) {
      setShowConfirmDialog(true);
    } else {
      dispatch(editBill(id, gasto))
      navigate('/bill');
    }
  };
  // Manejar la confirmación
  const handleConfirmAgendar = () => {
    dispatch(createDetailBill(gasto.descripcion));
    //const fecha = `${gasto.fecha.split('-')[2]}/${gasto.fecha.split('-')[1]}/${gasto.fecha.split('-')[0]}`;
    //const bill = { ...gasto, id: uuid() };
    dispatch(editBill(id, gasto));
    setShowConfirmDialog(false); // Cerrar el diálogo
    navigate('/bill'); // Mueve la navegación aquí
  };

  const handleCancelAgendar = () => {
    //const fecha = `${gasto.fecha.split('-')[2]}/${gasto.fecha.split('-')[1]}/${gasto.fecha.split('-')[0]}`;
    //const bill = { ...gasto, id: uuid() };
    dispatch(editBill(id, gasto));
    setShowConfirmDialog(false); // Cerrar el diálogo
    navigate('/bill'); // Mueve la navegación aquí
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-1">
      <h3 className="mb-2">Cargando mis gastos</h3>
      <label htmlFor="fecha" className="block text-sm font-bold mb-2">Fecha del gasto:</label>
      <input
        type="text"
        id="fecha"
        name='fecha'
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        onChange={(e) => handleChange('fecha', e.target.value)}
        value={gasto.fecha}
      />
      <label htmlFor="descripcion" className="block text-sm font-bold mb-2">Descripción:</label>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Descripción',
          value: gasto.descripcion,
          onChange: (e, { newValue }) => handleChange('descripcion', newValue),
          className: "w-full p-2 rounded-md bg-zinc-600 mb-2"
        }}
      />
      <label htmlFor="monto" className="block text-sm font-bold mb-2">Importe en $</label>
      <input
        name="monto"
        id="monto"
        type="number"
        placeholder="Monto"
        value={gasto.monto}
        onChange={(e) => handleChange('monto', e.target.value)}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <label htmlFor="mensual" className="block text-sm font-bold mb-2">Mensual:</label>
      <input
        name="mensual"
        id="mensual"
        type="checkbox"
        checked={gasto.mensual}
        onChange={(e) => handleChange('mensual', e.target.checked)} // Cambio aquí
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <label htmlFor="diferido" className="block text-sm font-bold mb-2">Diferido:</label>
      <input
        name="diferido"
        id="diferido"
        type="checkbox"
        checked={gasto.diferido}
        onChange={(e) => handleChange('diferido', e.target.checked)} // Cambio aquí
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      {gasto.diferido && ( // Renderizar el input de fecha diferida si gasto.diferido es verdadero
        <div>
          <label htmlFor="fecha_dif" className="block text-sm font-bold mb-2">Fecha diferida:</label>
          <input
            type="text"
            name='fecha_dif'
            className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            onChange={(e) => handleChange('fecha_dif', e.target.value)}
            value={gasto.fecha_dif}
          />
        </div>
      )}
      <button type="submit" className="bg-indigo-600 py-1 px-2">Guardar</button>
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded border border-gray-300">
            <p className="text-black">¿Deseas agregar este gasto a tu lista de gastos?</p>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-2" onClick={handleConfirmAgendar}>Sí</button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full" onClick={handleCancelAgendar}>No</button>
          </div>
        </div>
      )}
    </form>
  );
}

export default EditBillForm;