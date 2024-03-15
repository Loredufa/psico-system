import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBills, getBills } from "../features/gastos/actions";
import { clearMessage } from "../features/gastos/gastoSlice";


function GastoList() {
  const stateGasto = useSelector((state) => state.gastos.gasto_list);
  const message = useSelector((state) => state.gastos.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBills());
  }, [dispatch]);

  const handlerDelete = (id) => {
    dispatch(deleteBills(id));
    // Actualizar la página después de 1 segundo para permitir que se complete la eliminación
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    // Borra el mensaje después de 3 segundos
    const timer = setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);

    // Limpia el temporizador cuando el componente se desmonta o cuando el mensaje cambia
    return () => clearTimeout(timer);
  }, [message, dispatch]);

  return (
    <div className="w-4/6">
      <h2>Sistema de gestión de gastos</h2>
      <header className="flex justify-between items-center py-4">
        <h3>Gastos cargados {stateGasto.length}</h3>
        {message && <h1 className="text-red-700 italic mb-4">{message}</h1>}
        <Link to="./create-bills" className="bg-indigo-600 px-2 py-1 rounded-sm text-sm">
          Nuevo
        </Link>
      </header>
      <div className="grid grid-cols-1 gap-3">
        {stateGasto.map((gasto) => (
          <div key={gasto.id} className="bg-neutral-800 p-4 rounded-md">
            <header className="flex justify-between">
              <h5>{gasto.fecha}</h5>
              <h3>{gasto.descripcion}</h3>
              <p>{gasto.monto}</p>
              <div className="flex gap-x-2">
                <Link to={`/edit-bills/${gasto.id}`} className="bg-zinc-600 px-2 py-1 text-xs rounded-md">
                  Editar
                </Link>
                <button
                  onClick={() => handlerDelete(gasto.id)}
                  className="bg-red-500 px-2 py-1 test-xs rounded-md self-center">
                  Eliminar
                </button>
              </div>
            </header>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GastoList;
