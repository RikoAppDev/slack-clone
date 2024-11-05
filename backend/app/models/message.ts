import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Channel from './channel.ts'
import User from './user.ts'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Message extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare content: string

    @column()
    declare sender_id: number

    @column()
    declare channel_id: number

    @column.dateTime({ autoCreate: true })
    declare sent_at: DateTime

    @hasOne(() => User, {
        localKey: 'senderId',
    })
    declare author: relations.HasOne<typeof User>

    @hasOne(() => Channel, {
        localKey: 'channelId',
    })
    declare channel: relations.HasOne<typeof Channel>
}
