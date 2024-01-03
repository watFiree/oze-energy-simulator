import { VariablesPanel } from "./components/VariablesPanel/VariablesPanel";
import { SimulationDisplay } from "./components/SimulationDisplay/SimulationDisplay";

function App() {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <VariablesPanel />

        <SimulationDisplay />
      </div>
    </div>
  );
}

export default App;
