import { jwtHandler } from '@prometeo-dev/jwt-handler-library/dist/middlewares';
import { env } from '../../../config/env';

export const JwtHandler = () =>
  jwtHandler({
    jwtHeaderName: 'authorization',
    secret: env.jwtSecretAccessKey,
    debugMode: true,
  });

export default JwtHandler;
