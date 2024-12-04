import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.ts'
import Channel from '#models/channel'
import { MembershipRole, MembershipStatus } from '#models/enum'

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
        await user1.related('channels').attach({
            [channel1.id]: {
                status: MembershipStatus.ACTIVE,
                role: MembershipRole.ADMIN,
            },
            [channel2.id]: {
                status: MembershipStatus.INVITED,
                role: MembershipRole.MEMBER,
            },
            [channel3.id]: {
                status: MembershipStatus.INVITED,
                role: MembershipRole.MEMBER,
            },
            [channel4.id]: {
                status: MembershipStatus.ACTIVE,
                role: MembershipRole.MEMBER,
            },
        })
        await user2.related('channels').attach({
            [channel1.id]: {
                status: MembershipStatus.ACTIVE,
                role: MembershipRole.MEMBER,
            },
            [channel2.id]: {
                status: MembershipStatus.ACTIVE,
                role: MembershipRole.ADMIN,
            },
            [channel3.id]: {
                status: MembershipStatus.INVITED,
                role: MembershipRole.MEMBER,
            },
            [channel4.id]: {
                status: MembershipStatus.ACTIVE,
                role: MembershipRole.MEMBER,
            },
        })
        await user3.related('channels').attach({
            [channel1.id]: {
                status: MembershipStatus.ACTIVE,
                role: MembershipRole.MEMBER,
            },
            [channel2.id]: {
                status: MembershipStatus.ACTIVE,
                role: MembershipRole.MEMBER,
            },
            [channel3.id]: {
                status: MembershipStatus.ACTIVE,
                role: MembershipRole.ADMIN,
            },
            [channel4.id]: {
                status: MembershipStatus.INVITED,
                role: MembershipRole.MEMBER,
            },
        })
        await user4.related('channels').attach({
            [channel1.id]: {
                status: MembershipStatus.BANNED,
                role: MembershipRole.MEMBER,
            },
            [channel2.id]: {
                status: MembershipStatus.INVITED,
                role: MembershipRole.MEMBER,
            },
            [channel3.id]: {
                status: MembershipStatus.ACTIVE,
                role: MembershipRole.MEMBER,
            },
            [channel4.id]: {
                status: MembershipStatus.ACTIVE,
                role: MembershipRole.ADMIN,
            },
        })

        const users = await User.all()
        const usersToAssign = users.slice(4, users.length - 1)

        const channelGeneral = await Channel.findByOrFail('name', 'General')

        // Attach all other users to the "General" channel
        for (const user of usersToAssign) {
            if (
                user.username === 'john_doe' ||
                user.username === 'jane_doe' ||
                user.username === 'bob' ||
                user.username === 'alice'
            )
                continue
            await user.related('channels').attach({
                [channelGeneral.id]: {
                    status: MembershipStatus.ACTIVE,
                    role: MembershipRole.MEMBER,
                },
            })
        }
    }
}
