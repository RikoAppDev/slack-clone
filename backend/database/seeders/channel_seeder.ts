import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Channel from '../../app/models/channel.ts'
import User from '#models/user'
import { ChannelFactory } from '#database/factories/channel_factory'
import { DateTime } from 'luxon'

export default class ChannelSeeder extends BaseSeeder {
    public async run() {
        const john = await User.findByOrFail('username', 'john_doe')
        const jane = await User.findByOrFail('username', 'jane_doe')
        const alice = await User.findByOrFail('username', 'alice')
        const bob = await User.findByOrFail('username', 'bob')

        await Channel.createMany([
            { name: 'General', created_by: john.id, is_private: false },
            { name: 'Development', created_by: jane.id, is_private: false },
            { name: 'Design', created_by: alice.id },
            { name: 'Marketing', created_by: bob.id },
            { name: 'Random', created_by: john.id, last_activity_at: DateTime.fromJSDate(
                new Date(Date.now() - 31 * 24 * 60 * 60 * 1000)
            ),
            },
        ])

        await ChannelFactory.createMany(10)
    }
}
