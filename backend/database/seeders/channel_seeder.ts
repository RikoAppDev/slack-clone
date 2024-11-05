import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Channel from '../../app/models/channel.ts'

export default class ChannelSeeder extends BaseSeeder {
    public async run() {
        const uniqueKey = 'name'

        await Channel.updateOrCreateMany(uniqueKey, [
            {
                name: 'general',
            },
        ])
    }
}
