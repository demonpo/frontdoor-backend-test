export const env = {
  port: process.env.PORT ?? 3000,
  jwtSecretKey: process.env.JWT_SECRET_KEY ?? 'jwt',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  topicNameToConsume: process.env.TOPIC_NAME_TO_CONSUME ?? '',
  rabbitmqUrl: process.env.RABBITMQ_URL ?? '',
  producerOn: process.env.producerOn ?? false,
};
