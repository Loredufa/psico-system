import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createDetailIncome, editIncome } from '../features/ingresos/actions';


function EditIncomeForm() {
  const [ingreso, setIngreso] = useState({
    fecha: '',
    descripcion: '',
    monto: '',
    mensual: false,
    paciente: false,
    cobrado: false,
    cancelado: false,
    facturado: false
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingresos = useSelector(state => state.ingresos.ingreso_list);
  const detalle = useSelector(state => state.ingresos.detail_ingreso);

  useEffect(() => {
    if (ingresos.length > 0) {
      const ingresoEncontrado = ingresos.find(e => e.id === id);
      if (ingresoEncontrado) {
        //const formattedDate = new Date(gastoEncontrado.fecha).toLocaleDateString('en-CA');
        setIngreso({
          ...ingresoEncontrado,
          // fecha: formattedDate,
          fecha: ingresoEncontrado.fecha,
          descripcion: ingresoEncontrado.descripcion,
          monto: ingresoEncontrado.monto,
          mensual: Boolean(ingresoEncontrado.mensual),
          paciente: Boolean(ingresoEncontrado.paciente),
          cobrado: Boolean(ingresoEncontrado.cobrado),
          cancelado: Boolean(ingresoEncontrado.cancelado),
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
    } console.log('SOY EL INGRESO', ingreso)
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
    const descripcion = ingreso.descripcion.trim().toLowerCase();
    const existeDescripcion = detalle.some(item => item.descripcion.toLowerCase() === descripcion);
    if (!existeDescripcion) {
      setShowConfirmDialog(true);
    } else {
      //const fecha = `${gasto.fecha.split('-')[2]}/${gasto.fecha.split('-')[1]}/${gasto.fecha.split('-')[0]}`;
      //const bill = { ...gasto, id: uuid() };
      dispatch(editIncome(id, ingreso))
      navigate('/income');
    }
  };
  // Manejar la confirmación
  const handleConfirmAgendar = () => {
    dispatch(createDetailIncome(ingreso.descripcion));
    //const fecha = `${gasto.fecha.split('-')[2]}/${gasto.fecha.split('-')[1]}/${gasto.fecha.split('-')[0]}`;
    //const bill = { ...gasto, id: uuid() };
    dispatch(editIncome(id, ingreso));
    setShowConfirmDialog(false); // Cerrar el diálogo
    navigate('/income'); // Mueve la navegación aquí
  };

  const handleCancelAgendar = () => {
    //const fecha = `${gasto.fecha.split('-')[2]}/${gasto.fecha.split('-')[1]}/${gasto.fecha.split('-')[0]}`;
    //const bill = { ...gasto, id: uuid() };
    dispatch(editIncome(id, ingreso));
    setShowConfirmDialog(false); // Cerrar el diálogo
    navigate('/income'); // Mueve la navegación aquí
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-1">
        <h3 className="mb-2">Cargando mis ingresos</h3>
        <label htmlFor="fecha" className="block text-sm font-bold mb-2">Fecha del ingreso:</label>
        <input
            type="date"
            name='fecha'
            className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            onChange={(e) => handleChange('fecha', e.target.value)}
            value={ingreso.fecha}
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
                value: ingreso.descripcion,
                onChange: (e, { newValue }) => handleChange('descripcion', newValue),
                className: "w-full p-2 rounded-md bg-zinc-600 mb-2"

            }}
        />
        <label htmlFor="monto" className="block text-sm font-bold mb-2">Importe en $</label>
        <input
            name="monto"
            type="number"
            placeholder="Monto"
            value={ingreso.monto}
            onChange={(e) => handleChange('monto', e.target.value)}
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
        {showConfirmDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded border border-gray-300">
                    <p className="text-black">¿Deseas agregar este ingreso a tu lista de ingresos?</p>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-2" onClick={handleConfirmAgendar}>Sí</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full" onClick={handleCancelAgendar}>No</button>
                </div>
            </div>
        )}
    </form>
  );
}

export default EditIncomeForm; 