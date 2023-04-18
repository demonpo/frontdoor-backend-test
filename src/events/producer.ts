import topicsConfig from './topics-config.json';
import { Producer } from '@prometeo-dev/rabbit-consumer-producer-library/dist/producer/producer';
import { env } from '../config/env';

(async function () {
  const topics = topicsConfig.topics.map(
      (topic: string) => `${topicsConfig.appName}-${topic}`,
    ),
    producer = Producer.getInstance();
  await producer.setup({
    createTopic: true,
    topics: topics,
    debugMode: !env.producerOn,
    rabbitmqUrl: env.rabbitmqUrl,
  });
  return producer;
})();
