import { DataSource } from 'typeorm';
import typeormConfig from './typeorm-config';

const AppDataSource = new DataSource({
  ...typeormConfig,
});

export default AppDataSource;
