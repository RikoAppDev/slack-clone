import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Channel from './channel.ts'
import User from './user.ts'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Message extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @belongsTo(() => User, {
        foreignKey: 'createdBy',
    })
    declare author: relations.BelongsTo<typeof User>

    @belongsTo(() => Channel, {
        foreignKey: 'channelId',
    })
    declare channel: relations.BelongsTo<typeof Channel>
}
