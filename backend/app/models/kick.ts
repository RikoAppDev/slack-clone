import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import * as relations from '@adonisjs/lucid/types/relations'
import Channel from '#models/channel'

export default class Kick extends BaseModel {
    @column({ isPrimary: true })
    declare channelId: string

    @column({ isPrimary: true })
    declare kickedId: string

    @column({ isPrimary: true })
    declare kickerId: string

    @belongsTo(() => User, {
        localKey: 'kicked_id',
    })
    declare kickedUser: relations.BelongsTo<typeof User>

    @belongsTo(() => Channel, {
        localKey: 'channel_id',
    })
    declare channel: relations.BelongsTo<typeof Channel>

    @belongsTo(() => User, {
        localKey: 'kicker_id',
    })
    declare kicker: relations.BelongsTo<typeof User>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime
}
