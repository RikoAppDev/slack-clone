import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Channel from '../../app/models/channel.ts'

export default class ChannelSeeder extends BaseSeeder {
    public async run() {
        await Channel.createMany([
            { name: 'General' },
            { name: 'Development' },
            { name: 'Design' },
            { name: 'Marketing' },
        ])
    }
}
