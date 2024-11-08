import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Message from '../../app/models/message.ts'
import User from '../../app/models/user.ts'
import Channel from '../../app/models/channel.ts'
import { DateTime } from 'luxon'

export default class MessageSeeder extends BaseSeeder {
    public async run() {
        // Fetch UUIDs for specific users and channels
        const user1 = await User.findByOrFail('username', 'john_doe')
        const user2 = await User.findByOrFail('username', 'jane_doe')
        const user3 = await User.findByOrFail('username', 'alice')
        const user4 = await User.findByOrFail('username', 'bob')

        const channel1 = await Channel.findByOrFail('name', 'General')
        const channel2 = await Channel.findByOrFail('name', 'Development')
        const channel3 = await Channel.findByOrFail('name', 'Design')
        const channel4 = await Channel.findByOrFail('name', 'Marketing')

        // Create messages with UUIDs for sender_id and channel_id
        await Message.createMany([
            {
                content: 'Hello, world!',
                sender_id: user1.id,
                channel_id: channel1.id,
                sent_at: DateTime.local(),
            },
            {
                content: 'How is the project going?',
                sender_id: user2.id,
                channel_id: channel2.id,
                sent_at: DateTime.local(),
            },
            {
                content: 'Let’s meet at 3 PM.',
                sender_id: user3.id,
                channel_id: channel3.id,
                sent_at: DateTime.local(),
            },
            {
                content: 'Can someone review my PR?',
                sender_id: user4.id,
                channel_id: channel4.id,
                sent_at: DateTime.local(),
            },
        ])
    }
}
