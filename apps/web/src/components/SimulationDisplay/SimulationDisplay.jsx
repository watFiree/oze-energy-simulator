import { useDataProvider } from "../../DataProvider/useDataProvider";

export const SimulationDisplay = () => {
  const { data } = useDataProvider();

  return (
    <div>
      <h1>Simulation Display</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
