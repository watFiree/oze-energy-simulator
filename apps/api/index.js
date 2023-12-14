import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const port = process.env.API_PORT || 6969;
const wss = new WebSocketServer({ port });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
});

console.log(`WebSocket server started on ws://localhost:${port}`);
