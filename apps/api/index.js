import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import calculateSimulationResults from "./lib/calculateSimulationResults.js";

dotenv.config({ path: "../../.env" });

const port = process.env.API_PORT || 6969;
const wss = new WebSocketServer({ port });

wss.on("connection", function connection(ws) {
  let parameters = {};
  let results = {};
  let isRunning = false;

  ws.on("message", function incoming(message) {
    const { type, data } = JSON.parse(message) ?? {};

    switch (type) {
      case "START":
        isRunning = true;
        break;
      case "PAUSE":
        isRunning = false;
        break;
      case "DATA": {
        const { waterTemperature, ...clientParameters } = data;
        parameters = { ...parameters, ...clientParameters };
        if (waterTemperature) {
          results.waterTemperature = waterTemperature;
        }
        break;
      }
    }
  });

  const simulation = setInterval(() => {
    if (!isRunning) {
      return;
    }

    results = calculateSimulationResults({
      ...parameters,
      waterTemperature: results.waterTemperature,
    });

    ws.send(JSON.stringify(results));
  }, 1000);

  ws.on("close", () => {
    clearInterval(simulation);
  });
});

console.log(`WebSocket server started on ws://localhost:${port}`);
