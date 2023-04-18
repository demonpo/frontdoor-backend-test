// eslint-disable-next-line @typescript-eslint/no-var-requires
const queuesConf = require('./src/events/queues-config.json');

const apps = [];

for (const queue of queuesConf.topicsToConsume) {
  apps.push({
    name: `consumer ${queue}`,
    script: 'npm run consume',
    env: { TOPIC_NAME_TO_CONSUME: queue },
  });
}

module.exports = {
  apps,
};