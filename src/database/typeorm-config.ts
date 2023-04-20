import 'dotenv/config';

const typeormConfig: any = {
  type: 'mongodb' as const,
  host: process.env.MONGO_INITDB_HOST || 'localhost',
  url: process.env.POSTGRESQL_URL,
  port: process.env.DB_PORT || 27017,
  username: process.env.MONGO_INITDB_ROOT_USERNAME || 'mongo',
  password: process.env.MONGO_INITDB_ROOT_PASSWORD || 'password',
  database: process.env.MONGO_INITDB_DATABASE || 'dev',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  subscribers: [`${__dirname}/../**/*.subscriber.{js,ts}`],
  migrations: [`${__dirname}/migrations/*.{js,ts}`],
  factories: [`${__dirname}/factories/*.{js,ts}`],
  seeds: [`${__dirname}/seeds/*.{js,ts}`],
  cli: {
    migrationsDir: __dirname + '/migrations',
  },
  synchronize: true,
};

export default typeormConfig;
