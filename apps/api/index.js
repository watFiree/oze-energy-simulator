import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import calculateSimulationResults from "./lib/calculateSimulationResults.js";
import calculateWaterTempLossInTime from "./lib/calculateWaterTempLossInTime.js";

dotenv.config({ path: "../../.env" });

const port = process.env.API_PORT || 6969;
const wss = new WebSocketServer({ port });

console.log(
  "temp",
  calculateWaterTempLossInTime({
    kFactor: 0.032,
    waterAmount: 80,
    outsideTemperature: 21,
    waterTemperature: 45,
    boilerHeight: 1.023,
    boilerDiameter: 0.452,
    boilerThickness: 0.02,
    simulationSpeed: 3600000,
  })
);

wss.on("connection", function connection(ws) {
  let parameters = {};
  let results = {};

  ws.on("message", function incoming(message) {
    const { waterTemperature, ...clientParameters } = JSON.parse(message) ?? {};

    parameters = { ...parameters, ...clientParameters };
    result.waterTemperature = waterTemperature;

    ws.send("New parameters received");
  });

  const simulation = setInterval(() => {
    results = calculateSimulationResults({
      ...parameters,
      waterTemperature: results.waterTemperature,
    });

    ws.send(JSON.stringify(result));
  }, parameters.simulationSpeed || 1000);

  ws.on("close", () => {
    clearInterval(simulation);
  });
});

console.log(`WebSocket server started on ws://localhost:${port}`);
