import { heatCapacity } from "./constants.js";

const calculateBoilerSurfaceArea = ({ boilerHeight, boilerDiameter }) => {
  return (
    Math.PI * boilerDiameter * boilerHeight +
    2 * Math.PI * Math.pow(boilerDiameter / 2, 2)
  );
};

export default (parameters) => {
  const {
    kFactor,
    waterAmount,
    outsideTemperature,
    waterTemperature,
    boilerHeight,
    boilerDiameter,
    boilerThickness,
    simulationSpeed,
  } = parameters;

  const boilerSurfaceArea = calculateBoilerSurfaceArea({
    boilerHeight,
    boilerDiameter,
  });

  const deltaT = waterTemperature - outsideTemperature;
  const Q = (kFactor * boilerSurfaceArea * deltaT) / boilerThickness; // [W]
  const energyLoss = Q * (simulationSpeed / 1000); // [J]
  const energyUsed = energyLoss / (waterAmount * heatCapacity * 1000); // [°C]

  return waterTemperature - energyUsed;
};
