import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.ts'
import { DateTime } from 'luxon'
import { UserFactory } from '#database/factories/user_factory'
import { UserStatus } from '#models/enum'

export default class UserSeeder extends BaseSeeder {
    public async run() {
        await User.createMany([
            {
                firstname: 'John',
                lastname: 'Doe',
                username: 'john_doe',
                status: UserStatus.OFFLINE,
                preferredStatus: UserStatus.OFFLINE,
                email: 'john@example.com',
                password: 'password:123',
                created_at: DateTime.local(),
            },
            {
                firstname: 'Jane',
                lastname: 'Doe',
                username: 'jane_doe',
                status: UserStatus.OFFLINE,
                preferredStatus: UserStatus.OFFLINE,
                email: 'jane@example.com',
                password: 'password:123',
                created_at: DateTime.local(),
            },
            {
                firstname: 'Alice',
                lastname: 'Palice',
                username: 'alice',
                status: UserStatus.OFFLINE,
                preferredStatus: UserStatus.OFFLINE,
                email: 'alice@example.com',
                password: 'password:123',
                created_at: DateTime.local(),
            },
            {
                firstname: 'Bob',
                lastname: 'Bobek',
                username: 'bob',
                status: UserStatus.DND,
                preferredStatus: UserStatus.DND,
                email: 'bob@example.com',
                password: 'password:123',
                created_at: DateTime.local(),
            },
        ])

        await UserFactory.createMany(20)
    }
}
