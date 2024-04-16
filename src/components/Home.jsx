import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLegend, VictoryStack, VictoryTheme } from 'victory';
import { getCurrentBill, getCurrentDiferido } from '../features/gastos/actions';
import { getCurrentIncome, getPendingIncome } from '../features/ingresos/actions';

function Home() {
  const current_gasto = useSelector((state) => state.gastos.current_gasto);
  const current_diferido = useSelector((state) => state.gastos.current_diferido);
  const current_ingreso = useSelector((state) => state.ingresos.current_ingreso);
  const ingreso_pendiente = useSelector((state) => state.ingresos.ingreso_pendiente);

  const gasto_erogado = current_gasto.total - current_diferido.total;
  const ingreso_recibido =  current_ingreso.total - ingreso_pendiente.total

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentBill());
    dispatch(getCurrentDiferido());
    dispatch(getCurrentIncome());
    dispatch(getPendingIncome());
  }, [dispatch]);


  const combinedData = [
    { quarter: 1, earnings: current_ingreso.total, type: "Ingresos" },
    { quarter: 2, earnings: gasto_erogado, type: "Gastos" },
  ];

  const combinedData2 = [
    { quarter: 1, earnings: ingreso_recibido, type: "Ingresos pendientes" },
    { quarter: 2, earnings: current_diferido.total, type: "Gastos diferidos" },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-1/3">
        <div>
          <h2>Seguimiento hormiga</h2>
        </div>
        <div style={{ overflow: "visible" }}>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={80}
          >
            <VictoryAxis
              tickValues={[1, 2]}
              tickFormat={["Ingresos", "Gastos"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryStack
              colorScale={["green", "blue"]} // Colores para Ingresos y Gastos
            >
              <VictoryBar
                data={combinedData}
                x="quarter"
                y="earnings"
                style={{ data: { fill: ({ datum }) => datum.type === "Gastos" ? "blue" : "green" } }} // Colores personalizados para cada barra
              />
              <VictoryBar
                data={combinedData2}
                x="quarter"
                y="earnings"
                style={{ data: { fill: ({ datum }) => datum.type === "Gastos diferidos" ? "red" : "orange" } }} // Colores personalizados para cada barra
              />
            </VictoryStack>
          </VictoryChart>
        </div>
      </div>
      <div className="w-1/3">
        <VictoryLegend
          x={30} // Posición horizontal
          y={100} // Posición vertical
          title="Tipos" // Título de la leyenda
          centerTitle // Centrar el título
          orientation="vertical" // Orientación horizontal
          gutter={20} // Espacio entre elementos
          style={{
            title: {
              fontSize: 30,
              fill: "white" // Cambia el color del texto del título a blanco
            },
            labels: {
              fill: "white" // Cambia el color del texto de las etiquetas a blanco
            }
          }} // Estilo del título y las etiquetas
          data={[
            { name: "Ingresos", symbol: { fill: "green" } },
            { name: "Gastos", symbol: { fill: "blue" } },
            { name: "Gastos diferidos", symbol: { fill: "red" } },
            { name: "Ingresos pendientes", symbol: { fill: "orange" } }
          ]}
        />
      </div>
    </div>
  );

}

export default Home;
