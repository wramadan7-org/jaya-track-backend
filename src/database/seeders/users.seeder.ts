import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Users } from 'src/users/users.entity';
import { hashPassword } from 'src/common/utils/bcrypt';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Users);
    const hashedPassword = await hashPassword('admin12345');

    await repo.insert([
      {
        id: crypto.randomUUID(),
        name: 'Admin',
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
      },
    ]);
  }
}

module.exports = UserSeeder;
