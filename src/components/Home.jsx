import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLegend, VictoryStack, VictoryTheme } from 'victory';
import { getCurrentBill, getCurrentDiferido } from '../features/gastos/actions';
import { getCurrentIncome } from '../features/ingresos/actions';
import Voz from "./Voz";

function Home() {
  const current_gasto = useSelector((state) => state.gastos.current_gasto);
  const current_diferido = useSelector((state) => state.gastos.current_diferido);
  const current_ingreso = useSelector((state) => state.ingresos.current_ingreso);

  console.log(current_gasto);
  const gasto_erogado = current_gasto.total - current_diferido.total;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentBill());
    dispatch(getCurrentDiferido());
    dispatch(getCurrentIncome());
  }, [dispatch]);

  const combinedData = [
    { quarter: 1, earnings: current_ingreso.total, type: "Ingresos" },
    { quarter: 2, earnings: gasto_erogado, type: "Gastos" },
    { quarter: 2, earnings: current_diferido.total, type: "Gastos diferidos" },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full bg-black">
      <div className="flex w-2/3 items-start">
        <div className="w-1/2">
          <div>
            <h2 className="text-center text-white">Seguimiento hormiga</h2>
          </div>
          <div style={{ overflow: "visible" }}>
            <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
              <VictoryAxis tickValues={[1, 2]} tickFormat={["Ingresos", "Gastos"]} />
              <VictoryAxis dependentAxis tickFormat={(x) => (`$${x / 1000}k`)} />
              <VictoryStack colorScale={["green", "blue", "red"]}>
                <VictoryBar
                  data={combinedData.filter(data => data.type === "Ingresos")}
                  x="quarter"
                  y="earnings"
                  style={{ data: { fill: "green" } }}
                />
                <VictoryBar
                  data={combinedData.filter(data => data.type === "Gastos")}
                  x="quarter"
                  y="earnings"
                  style={{ data: { fill: "blue" } }}
                />
                <VictoryBar
                  data={combinedData.filter(data => data.type === "Gastos diferidos")}
                  x="quarter"
                  y="earnings"
                  style={{ data: { fill: "red" } }}
                />
              </VictoryStack>
            </VictoryChart>
          </div>
        </div>
        <div className="w-1/2">
          <VictoryLegend
            x={30}
            y={50}
            title="Tipos"
            centerTitle
            orientation="vertical"
            gutter={20}
            style={{
              title: { fontSize: 30, fill: "white" },
              labels: { fill: "white" }
            }}
            data={[
              { name: `Ingresos ($${current_ingreso.total})`, symbol: { fill: "green" } },
              { name: `Gastos ($${gasto_erogado})`, symbol: { fill: "blue" } },
              { name: `Gastos diferidos ($${current_diferido.total})`, symbol: { fill: "red" } }
            ]}
          />
        </div>
      </div>
      <div className="w-2/3 mt-4 bg-black">
        <Voz />
      </div>
    </div>
  );
}

export default Home;

