import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.ts'
import { DateTime } from 'luxon'

export default class UserSeeder extends BaseSeeder {
    public async run() {
        await User.createMany([
            {
                username: 'john_doe',
                email: 'john@example.com',
                password: 'password1',
                created_at: DateTime.local(),
            },
            {
                username: 'jane_doe',
                email: 'jane@example.com',
                password: 'password2',
                created_at: DateTime.local(),
            },
            {
                username: 'alice',
                email: 'alice@example.com',
                password: 'password3',
                created_at: DateTime.local(),
            },
            {
                username: 'bob',
                email: 'bob@example.com',
                password: 'password4',
                created_at: DateTime.local(),
            },
        ])
    }
}
