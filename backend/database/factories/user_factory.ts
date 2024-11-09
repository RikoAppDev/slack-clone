import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { DateTime } from 'luxon'

export const UserFactory = factory
    .define(User, async ({ faker }) => {
        return {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: 'password:123',
            created_at: DateTime.fromISO(faker.date.past().toISOString()),
            updated_at: DateTime.fromISO(faker.date.past().toISOString()),
        }
    })
    .build()
