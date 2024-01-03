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
    // boiler
    boilerPower, // kW
    boilerCapacity, // L
    requiredWaterTemperature, // degrees Celsius
    waterTemperature, // degrees Celsius
    socketVoltage, // W
    socketCurrent,
    //Współczynnik przewodzenia ciepła (k)
  } = parameters;

  if (waterTemperature >= requiredWaterTemperature) {
    return {
      isWaterHeaterTurnedOn: false,
      energyUsed: 0,
      energySource: null,
      waterTemperature,
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
    1
  );
  const energyFromSocket = socketVoltage * socketCurrent;

  return {
    isWaterHeaterTurnedOn: true,
    energyUsed: energyGeneratedByTurbine || energyFromSocket,
    energySource: energyGeneratedByTurbine ? "turbine" : "socket",
    waterTemperature: waterTemperature + 1,
  };
};
