import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Message from './message.ts'
import * as relations from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import User from '#models/user'

export default class Channel extends BaseModel {
    static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare id: string

    @beforeCreate()
    static assignUuid(channel: Channel) {
        channel.id = randomUUID()
    }

    @hasMany(() => Message, {
        foreignKey: 'channel_id',
    })
    declare messages: relations.HasMany<typeof Message>

    @column()
    declare name: string

    @column()
    declare is_private: boolean

    @column.dateTime({ autoCreate: true })
    declare last_activity_at: DateTime

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updated_at: DateTime

    @column()
    declare created_by: string

    @belongsTo(() => User, {
        foreignKey: 'created_by',
    })
    declare creator: relations.BelongsTo<typeof User>
}
