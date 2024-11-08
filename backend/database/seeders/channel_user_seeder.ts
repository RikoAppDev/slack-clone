import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.ts'
import Channel from '#models/channel'

export default class ChannelUserSeeder extends BaseSeeder {
    public async run() {
        // Retrieve users and channels by their unique identifiers
        const user1 = await User.findByOrFail('username', 'john_doe')
        const user2 = await User.findByOrFail('username', 'jane_doe')
        const user3 = await User.findByOrFail('username', 'alice')
        const user4 = await User.findByOrFail('username', 'bob')

        const channel1 = await Channel.findByOrFail('name', 'General')
        const channel2 = await Channel.findByOrFail('name', 'Development')
        const channel3 = await Channel.findByOrFail('name', 'Design')
        const channel4 = await Channel.findByOrFail('name', 'Marketing')

        // Attach users to channels by UUID
        await user1.related('channels').attach([channel1.id])
        await user2.related('channels').attach([channel2.id])
        await user3.related('channels').attach([channel3.id])
        await user4.related('channels').attach([channel4.id])
    }
}
