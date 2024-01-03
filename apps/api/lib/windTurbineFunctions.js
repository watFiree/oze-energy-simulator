/*** returns power generated by tuebine in kilo wats */
export const calculatePowerGeneratedByTurbine = (parameters) => {
  const {
    windSpeed,
    windDensity,
    bladeLength,
    generatorEfficiency,
    mechanicalEfficiency,
    CpFactor,
    minWindSpeedToWork,
    maxWindSpeedToWork,
  } = parameters;
  /* 
    exuations:
    P = 0,5*ρ*A*v^3* ηm* ηel* Cp
    A = (π*D)^2/4 where D is bladeLength * 2
  */

  if (windSpeed < minWindSpeedToWork || windSpeed > maxWindSpeedToWork) {
    return 0;
  }

  const A = Math.pow(Math.PI * bladeLength * 2, 2) / 4;

  return (
    0.5 *
    windDensity *
    A *
    Math.pow(windSpeed, 3) *
    generatorEfficiency *
    mechanicalEfficiency *
    CpFactor
  );
};

export const calculateEnergyGeneratedByTurbine = (power, time) => power * time;