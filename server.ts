// index.js
import logger from "./src/config/logger";
import { createMessageBroker } from "./src/factories/broker-factory";
import ws from "./src/socket";
import config from "config";

const startServer = async () => {
  let broker = null;

  try {
    broker = createMessageBroker();
    await broker.connectConsumer();
    await broker.consumeMessage(["order"], false);

    const PORT = config.get("server.port");

    ws.wsServer.listen(PORT, () => {
        console.log(`WebSocket server listening on port ${PORT}`);
      })
      .on("error", (err) => {
        console.error("WebSocket server error:", err.message);
        process.exit(1);
      });
  } catch (err) {
    logger.error("Error during server startup:", err);

    if (broker) {
      await broker.disconnectConsumer();
    }
    process.exit(1);
  }
};

void startServer();

