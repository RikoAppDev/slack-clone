import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserSeeder from '../user_seeder.ts'
import ChannelSeeder from '../channel_seeder.ts'
import MessageSeeder from '../message_seeder.ts'
import ChannelUserSeeder from '../channel_user_seeder.ts'

export default class IndexSeeder extends BaseSeeder {
    public async run() {
        await new UserSeeder(this.client).run()
        await new ChannelSeeder(this.client).run()
        await new ChannelUserSeeder(this.client).run()
        await new MessageSeeder(this.client).run()
    }
}
