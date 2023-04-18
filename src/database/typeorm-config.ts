const typeormConfig: any = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST || 'localhost',
  url: process.env.POSTGRESQL_URL,
  port: process.env.DB_PORT || 5432,
  username: process.env.POSTGRESQL_USERNAME || 'postgres',
  password: process.env.POSTGRESQL_PASSWORD || 'password',
  database: process.env.POSTGRESQL_DATABASE,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  subscribers: [`${__dirname}/../**/*.subscriber.{js,ts}`],
  migrations: [`${__dirname}/migrations/*.{js,ts}`],
  factories: [`${__dirname}/factories/*.{js,ts}`],
  seeds: [`${__dirname}/seeds/*.{js,ts}`],
  cli: {
    migrationsDir: __dirname + '/migrations',
  },
};

export default typeormConfig;
