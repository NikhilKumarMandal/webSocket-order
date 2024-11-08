import config from "config";
import { MessageBroker } from "../types/broker";
import { KafkaBroker } from "../config/kafka";

let broker: MessageBroker | null = null;

export const createMessageBroker = (): MessageBroker => {
  console.log("Attempting to connect to Kafka broker...");
  const brokerUrl = config.get("kafka.broker");

  if (!brokerUrl) {
    throw new Error("Kafka broker URL is not configured. Please set kafka.broker in your config file.");
  }

  const brokerUrls = (Array.isArray(brokerUrl) ? brokerUrl : [brokerUrl]) as string[];

  if (!broker) {
    try {
      broker = new KafkaBroker("ws-service", brokerUrls);
    } catch (error) {
      throw error;
    }
  }
  
  return broker;
};

