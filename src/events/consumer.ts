import { Consumer } from '@prometeo-dev/rabbit-consumer-producer-library/dist/consumer/consumer';
import queuesConfig from './queues-config.json';
import { eventsMap } from './eventsMap';
import { env } from '../config/env';
import AppDataSource from '../database/datasource';

(async function () {
  await AppDataSource.initialize();
  const consumer = new Consumer();
  await consumer.setup({
    rabbitmqUrl: env.rabbitmqUrl,
    appName: `${queuesConfig.appName}`,
    eventsMap: eventsMap,
    topicNameToConsume: `${env.topicNameToConsume}`,
  });
  consumer.start();
})();
