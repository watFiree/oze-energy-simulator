import { heatCapacity } from "./constants.js";

export default (parameters) => {
  const {
    boilerPower, // kW
    waterAmount, // L
    energyDelivered, // kWh
    simulationSpeed, // ms
  } = parameters;
  const energyUsed = Math.min(energyDelivered, boilerPower); // [kWh]
  const energyUsedJ =
    energyUsed * 1000 * 3600 * (simulationSpeed / (1000 * 3600)); // [J]

  const waterTemperatureGrow = energyUsedJ / (waterAmount * heatCapacity); // [°C]

  return waterTemperatureGrow;
};
