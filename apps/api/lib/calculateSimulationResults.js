import calculateWaterTempLossInTime from "./calculateWaterTempLossInTime.js";
import calculateWaterTempGrowth from "./calculateWaterTempGrowth.js";
import {
  calculatePowerGeneratedByTurbine,
  calculateEnergyGeneratedByTurbine,
} from "./windTurbineFunctions.js";

export default (parameters) => {
  const {
    windSpeed,
    windDensity,
    bladeLength,
    generatorEfficiency,
    mechanicalEfficiency,
    CpFactor,
    minWindSpeedToWork,
    maxWindSpeedToWork,
    boilerPower, // kW
    boilerHeight, // m
    boilerDiameter, // m
    boilerThickness, // m
    waterAmount, // L
    outsideTemperature, // [°C]
    requiredWaterTemperature, // [°C]
    waterTemperature, // [°C]
    socketVoltage, // W
    socketCurrent,
    simulationSpeed, // ms
    kFactor,
  } = parameters;

  const waterTemperatureLost = calculateWaterTempLossInTime({
    kFactor,
    waterAmount,
    outsideTemperature,
    waterTemperature,
    boilerHeight,
    boilerDiameter,
    boilerThickness,
    simulationSpeed,
  });

  if (waterTemperature >= requiredWaterTemperature) {
    return {
      isWaterHeaterTurnedOn: false,
      powerAmount: 0,
      energyDelivered: 0,
      energySource: null,
      waterTemperature: waterTemperature - waterTemperatureLost,
    };
  }

  const turbinePower = calculatePowerGeneratedByTurbine({
    windSpeed,
    windDensity,
    bladeLength,
    generatorEfficiency,
    mechanicalEfficiency,
    CpFactor,
    minWindSpeedToWork,
    maxWindSpeedToWork,
  });
  const energyGeneratedByTurbine = calculateEnergyGeneratedByTurbine(
    turbinePower,
    simulationSpeed / (1000 * 3600)
  ); // kWh
  const powerFromSocket = socketVoltage * socketCurrent; // W
  const energyFromSocket = powerFromSocket * (simulationSpeed / (1000 * 3600)); // kWh;

  const energyDelivered = energyGeneratedByTurbine || energyFromSocket;

  const waterTemperatureGrow = calculateWaterTempGrowth({
    boilerPower,
    waterAmount,
    energyDelivered,
    simulationSpeed,
  });

  return {
    isWaterHeaterTurnedOn: true,
    powerAmount: turbinePower || powerFromSocket,
    energyDelivered,
    energySource: energyGeneratedByTurbine ? "turbine" : "socket",
    waterTemperature:
      waterTemperature + waterTemperatureGrow - waterTemperatureLost,
  };
};
