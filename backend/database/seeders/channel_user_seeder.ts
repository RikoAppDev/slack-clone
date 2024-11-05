import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.ts'

export default class ChannelUserSeeder extends BaseSeeder {
    public async run() {
        const user1 = await User.findOrFail(1)
        const user2 = await User.findOrFail(2)
        const user3 = await User.findOrFail(3)
        const user4 = await User.findOrFail(4)

        await user1.related('channels').attach([1])
        await user2.related('channels').attach([2])
        await user3.related('channels').attach([3])
        await user4.related('channels').attach([4])
    }
}
