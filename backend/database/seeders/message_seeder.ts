import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Message from '../../app/models/message.ts'
import { DateTime } from 'luxon'

export default class MessageSeeder extends BaseSeeder {
    public async run() {
        await Message.createMany([
            {
                content: 'Hello, world!',
                sender_id: 1,
                channel_id: 1,
                sent_at: DateTime.local(),
            },
            {
                content: 'How is the project going?',
                sender_id: 2,
                channel_id: 2,
                sent_at: DateTime.local(),
            },
            {
                content: 'Let’s meet at 3 PM.',
                sender_id: 3,
                channel_id: 3,
                sent_at: DateTime.local(),
            },
            {
                content: 'Can someone review my PR?',
                sender_id: 4,
                channel_id: 4,
                sent_at: DateTime.local(),
            },
        ])
    }
}
