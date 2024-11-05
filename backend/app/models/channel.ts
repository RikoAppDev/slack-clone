import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Message from './message.ts'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Channel extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updated_at: DateTime

    @hasMany(() => Message, {
        foreignKey: 'channelId',
    })
    declare messages: relations.HasMany<typeof Message>
}
