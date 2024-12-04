import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { DateTime } from 'luxon'
import Channel from '#models/channel'
import Message from '#models/message'
import { UserStatus } from '#models/enum'

const returnRandomStatus = () => {
    const statuses = Object.values(UserStatus)
    return statuses[Math.floor(Math.random() * statuses.length)]
}

export const UserFactory = factory
    .define(User, async ({ faker }) => {
        return {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            username: faker.internet.userName(),
            status: returnRandomStatus(),
            email: faker.internet.email(),
            password: 'password:123',
            created_at: DateTime.fromISO(faker.date.past().toISOString()),
            updated_at: DateTime.fromISO(faker.date.past().toISOString()),
        }
    })
    .relation('channels', () => Channel)
    .relation('messages', () => Message)
    .build()
