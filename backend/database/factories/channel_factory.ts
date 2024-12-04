import factory from '@adonisjs/lucid/factories'
import Channel from '#models/channel'
import User from '#models/user'
import { DateTime } from 'luxon'
import Message from '#models/message'
import { randomInt } from 'node:crypto'

const getCamelcaseChannel = (channelName: string) => {
    if (randomInt(0, 1) === 0) {
        return channelName
    } else {
        return channelName.charAt(0).toUpperCase() + channelName.slice(1)
    }
}

export const ChannelFactory = factory
    .define(Channel, async ({ faker }) => {
        // Fetch or create users if they don't exist
        const users = await User.all()
        const userIds = users.map((user) => user.id)

        return {
            name: getCamelcaseChannel(faker.word.noun()),
            is_private: faker.datatype.boolean(),
            last_activity_at: DateTime.fromISO(faker.date.recent().toISOString()),
            created_by: faker.helpers.arrayElement(userIds), // Randomly assigns one of the four users
        }
    })
    .relation('users', () => User)
    .relation('creator', () => User)
    .relation('messages', () => Message)
    .build()
