import { AppDataSource } from './common/config/typeorm.config';
import { runSeeders } from 'typeorm-extension';

AppDataSource.initialize()
  .then(async () => {
    console.log('Running seeders...');
    await runSeeders(AppDataSource);
    console.log('Seeding completed.');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
