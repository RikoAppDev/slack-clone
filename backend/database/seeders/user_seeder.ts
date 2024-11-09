import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.ts'
import { DateTime } from 'luxon'
import { UserFactory } from '#database/factories/user_factory'

export default class UserSeeder extends BaseSeeder {
    public async run() {
        await User.createMany([
            {
                firstname: 'John',
                lastname: 'Doe',
                username: 'john_doe',
                email: 'john@example.com',
                password: 'password:123',
                created_at: DateTime.local(),
            },
            {
                firstname: 'Jane',
                lastname: 'Doe',
                username: 'jane_doe',
                email: 'jane@example.com',
                password: 'password:123',
                created_at: DateTime.local(),
            },
            {
                firstname: 'Alice',
                lastname: 'Palice',
                username: 'alice',
                email: 'alice@example.com',
                password: 'password:123',
                created_at: DateTime.local(),
            },
            {
                firstname: 'Bob',
                lastname: 'Bobek',
                username: 'bob',
                email: 'bob@example.com',
                password: 'password:123',
                created_at: DateTime.local(),
            },
        ])

        await UserFactory.createMany(10)
    }
}
