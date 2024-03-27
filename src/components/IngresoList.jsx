import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteIncome, getDetailIncomes, getIncomes } from "../features/ingresos/actions";
import { clearMessage } from "../features/ingresos/ingresoSlice";


function IngresoList() {
  const stateIngreso = useSelector((state) => state.ingresos.ingreso_list);
  const message = useSelector((state) => state.ingresos.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIncomes());
    dispatch(getDetailIncomes());
  }, [dispatch]);

  const handlerDelete = (id) => {
    dispatch(deleteIncome(id));
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
        <h3>Gastos cargados {stateIngreso.length}</h3>
        {message && <h1 className="text-red-700 italic mb-4">{message}</h1>}
        <Link to="./create-incomes" className="bg-indigo-600 px-2 py-1 rounded-sm text-sm">
          Nuevo
        </Link>
      </header>
      <div className="grid grid-cols-1 gap-3">
        {stateIngreso.map((ingreso) => (
          <div key={ingreso.id} className="bg-neutral-800 p-4 rounded-md">
            <header className="flex justify-between">
              <h5>{ingreso.fecha}</h5>
              <h3>{ingreso.descripcion}</h3>
              {ingreso.paciente? <p> es paciente</p> : <p>otros ing</p> }
              <p>${ingreso.monto}</p>
              {ingreso.cobrado? <p>ya cobrado</p> : <p> esta pendiente</p> }
              {ingreso.facturado? <p>ya facturado</p> : <p>s/fact</p> }
              {ingreso.mensual? <p>es mensual</p> : <p>es esporadico</p> }
              <div className="flex gap-x-2">
                <Link to={`/edit-incomes/${ingreso.id}`} className="bg-zinc-600 px-2 py-1 text-xs rounded-md">
                  Editar
                </Link>
                <button
                  onClick={() => handlerDelete(ingreso.id)}
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

export default IngresoList;
