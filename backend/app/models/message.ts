import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import Channel from './channel.ts'
import User from './user.ts'
import * as relations from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Message extends BaseModel {
    static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare id: string

    @beforeCreate()
    static assignUuid(message: Message) {
        message.id = randomUUID()
    }

    @column()
    declare content: string

    @column()
    declare sender_id: string

    @column()
    declare channel_id: string

    @column.dateTime({ autoCreate: true })
    declare sent_at: DateTime

    @belongsTo(() => User, {
        localKey: 'sender_id',
    })
    declare author: relations.BelongsTo<typeof User>

    @hasOne(() => Channel, {
        localKey: 'channel_id',
    })
    declare channel: relations.HasOne<typeof Channel>
}
