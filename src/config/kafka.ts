// import { Consumer, EachMessagePayload, Kafka } from "kafkajs";
// import { MessageBroker } from "../types/broker";

// export class KafkaBroker implements MessageBroker {
//   private consumer: Consumer;

//   constructor(clientId: string, brokers: string[]) {
//     const kafka = new Kafka({ clientId, brokers });

//     this.consumer = kafka.consumer({ groupId: clientId });
//   }

//   /**
//    * Connect the consumer
//    */
//   async connectConsumer() {
//     await this.consumer.connect();
//   }

//   /**
//    * Disconnect the consumer
//    */
//   async disconnectConsumer() {
//     await this.consumer.disconnect();
//   }

//   async consumeMessage(topics: string[], fromBeginning: boolean = false) {
//     await this.consumer.subscribe({ topics, fromBeginning });

//     await this.consumer.run({
//       eachMessage: async ({
//         topic,
//         partition,
//         message,
//       }: EachMessagePayload) => {
//         // Logic to handle incoming messages.
//         console.log({
//           value: message.value.toString(),
//           topic,
//           partition,
//         });
//       },
//     });
//   }
// }


import { Consumer, EachMessagePayload, Kafka } from "kafkajs";
import { MessageBroker } from "../types/broker";

export class KafkaBroker implements MessageBroker {
  private consumer: Consumer;

  constructor(clientId: string, brokers: string[]) {
    const kafka = new Kafka({ clientId, brokers });
    this.consumer = kafka.consumer({ groupId: clientId });
  }

  /**
   * Connect the consumer
   */
  async connectConsumer() {
    await this.consumer.connect();

  }

  /**
   * Disconnect the consumer
   */
  async disconnectConsumer() {
      await this.consumer.disconnect();
  }

  /**
   * Consume messages from specified topics
   * @param {string[]} topics - Array of topic names to subscribe to
   * @param {boolean} fromBeginning - Whether to read messages from the beginning
   */
   async consumeMessage(topics: string[], fromBeginning: boolean = false) {

        await this.consumer.subscribe({ topics, fromBeginning })
        
        await this.consumer.run({
            eachMessage: async ({topic,partition,message}: EachMessagePayload) => {
             console.log({
            value: message.value.toString(),
            topic,
            partition,
          });   
            }
        })
    }
}
