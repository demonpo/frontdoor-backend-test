import { glob } from 'glob';
import { Command } from 'commander';
import * as path from 'path';
import { useDataSource, useSeeders } from '@jorgebodega/typeorm-seeding';
import { DataSource, QueryRunner, Table } from 'typeorm';
const program = new Command();

program
  .name('seed')
  .version('1.0.0')
  .description('Run database seeds of your project')
  .option('--config <file>', 'path to your typeorm config')
  .parse(process.argv);

const loadFiles = (filePattern: string[]): string[] => {
  return filePattern
    .map((pattern) => glob.sync(path.resolve(process.cwd(), pattern)))
    .reduce((acc, filePath) => acc.concat(filePath), []);
};

const seedTable = 'seeds',
  createSeedsTableIfNotExist = async (
    queryRunner: QueryRunner,
  ): Promise<void> => {
    const tableExist = await queryRunner.hasTable(seedTable);
    if (!tableExist) {
      await queryRunner.createTable(
        new Table({
          name: seedTable,
          columns: [
            {
              name: 'id',
              type: 'int',
              isGenerated: true,
              generationStrategy: 'increment',
              isPrimary: true,
              isNullable: false,
            },
            {
              name: 'timestamp',
              type: 'int8',
              isPrimary: false,
              isNullable: false,
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
          ],
        }),
      );
    }
  },
  insertExecutedSeed = async (queryRunner: QueryRunner, seed: any) => {
    const qb = queryRunner.manager.createQueryBuilder();
    await qb
      .insert()
      .into(seedTable)
      .values({
        name: seed.name,
        timestamp: seed.timestamp,
      })
      .execute();
  },
  getExecutedSeeds = async (queryRunner: QueryRunner) => {
    const qb = queryRunner.manager.createQueryBuilder(),
      migrationsRaw = await qb
        .select()
        .orderBy('id', 'DESC')
        .from(seedTable, seedTable)
        .getRawMany();
    return migrationsRaw.map((migrationRaw) => {
      return {
        id: parseInt(migrationRaw['id']),
        timestamp: parseInt(migrationRaw['timestamp']),
        name: migrationRaw['name'],
      };
    });
  },
  getSeeds = (seedFiles: string[]) => {
    return seedFiles.map((seedFile) => {
      let seedName = seedFile.split('/')[seedFile.split('/').length - 1];
      seedName = seedName.replace('.ts', '').replace('.js', '');
      const name = seedName.split('-')[seedName.split('-').length - 1],
        timestamp = Number(seedName.split('-')[0]);
      return { name, timestamp, file: seedFile };
    });
  },
  getPendingSeeds = (seeds: any[], executedSeeds: any[]) => {
    const result = seeds.filter((s) => {
      return !executedSeeds.find(
        (seed) => seed.name === s.name && seed.timestamp === s.timestamp,
      );
    });
    return result;
  },
  run = async () => {
    const options = program.opts();
    let seedFiles: string[],
      executedSeeds: any[] = [],
      seeds: any[] = [],
      pendingSeeds: any[] = [],
      queryRunner: QueryRunner;

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const typeormConfig = require(options.config).default;
      const AppDataSource = await new DataSource({
        ...typeormConfig,
      }).initialize();
      await useDataSource(AppDataSource);
      seedFiles = loadFiles(typeormConfig.seeds);
      queryRunner = AppDataSource.createQueryRunner();
      await createSeedsTableIfNotExist(queryRunner);
      executedSeeds = await getExecutedSeeds(queryRunner);
      seeds = getSeeds(seedFiles);
      pendingSeeds = getPendingSeeds(seeds, executedSeeds);

      if (!pendingSeeds.length) {
        console.log('No new seeds to execute');
        process.exit(0);
      }

      // await useSeeding();
    } catch (error) {
      return handleError(error);
    }

    for (const seed of pendingSeeds) {
      try {
        console.log(`Executing seed ${seed.name}...`);
        await queryRunner.startTransaction();
        const seedInstance: any = await import(seed.file);
        await useSeeders(seedInstance[seed.name]);
        await insertExecutedSeed(queryRunner, {
          name: seed.name,
          timestamp: seed.timestamp,
        });
        await queryRunner.commitTransaction();
        console.log(`Seed ${seed.name} executed successfully!!`);
      } catch (error) {
        console.error(`Could not run seed ${seed.name}`, error);
        process.exit(1);
      }
    }

    process.exit(0);
  },
  handleError = (error: any) => {
    console.error(error);
    process.exit(1);
  };

run();
