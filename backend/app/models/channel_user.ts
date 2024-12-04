import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import * as relations from '@adonisjs/lucid/types/relations'
import Channel from '#models/channel'
import { MembershipRole, MembershipStatus } from '#models/enum'

export default class ChannelUser extends BaseModel {
    // Primary key for the composite primary key is handled automatically
    @column({ isPrimary: true })
    declare userId: string

    @column({ isPrimary: true })
    declare channelId: string

    // BelongsTo relationship with the User model
    @belongsTo(() => User, {
        foreignKey: 'userId',
    })
    declare user: relations.BelongsTo<typeof User>

    // BelongsTo relationship with the Channel model
    @belongsTo(() => Channel, {
        foreignKey: 'channelId',
    })
    declare channel: relations.BelongsTo<typeof Channel>

    // Enum for role, with two possible values: 'member' or 'admin'
    @column()
    declare role: MembershipRole

    // Enum for status, with three possible values: 'active', 'banned', 'invited'
    @column()
    declare status: MembershipStatus

    // Timestamps with auto-create and auto-update
    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}
