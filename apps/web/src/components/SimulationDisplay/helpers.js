export const roundToSpecifiedPrecision = (number, precision) =>
  Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
