import factory from '@adonisjs/lucid/factories'
import Channel from '#models/channel'
import User from '#models/user'
import { DateTime } from 'luxon'

export const ChannelFactory = factory
    .define(Channel, async ({ faker }) => {
        // Fetch or create users if they don't exist
        const users = await User.all()
        const userIds = users.map((user) => user.id)

        return {
            name: faker.word.noun(),
            is_private: faker.datatype.boolean(),
            last_activity_at: DateTime.fromISO(faker.date.recent().toISOString()),
            created_by: faker.helpers.arrayElement(userIds), // Randomly assigns one of the four users
        }
    })
    .build()
