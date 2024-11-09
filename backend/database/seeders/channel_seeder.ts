import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Channel from '../../app/models/channel.ts'
import User from '#models/user'
import { ChannelFactory } from '#database/factories/channel_factory'

export default class ChannelSeeder extends BaseSeeder {
    public async run() {
        const john = await User.findByOrFail('username', 'john_doe')
        const jane = await User.findByOrFail('username', 'jane_doe')
        const alice = await User.findByOrFail('username', 'alice')
        const bob = await User.findByOrFail('username', 'bob')

        await Channel.createMany([
            { name: 'General', created_by: john.id },
            { name: 'Development', created_by: jane.id },
            { name: 'Design', created_by: alice.id },
            { name: 'Marketing', created_by: bob.id },
        ])

        await ChannelFactory.createMany(10)
    }
}
