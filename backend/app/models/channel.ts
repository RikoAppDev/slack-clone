import { DateTime } from 'luxon'
import {
    BaseModel,
    beforeCreate,
    belongsTo,
    column,
    hasMany,
    manyToMany,
} from '@adonisjs/lucid/orm'
import Message from './message.ts'
import * as relations from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import ChannelUser from '#models/channel_user'
import Kick from '#models/kick'

export default class Channel extends BaseModel {
    static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare id: string

    @beforeCreate()
    static assignUuid(channel: Channel) {
        channel.id = randomUUID()
    }

    @hasMany(() => ChannelUser)
    declare channelUsers: relations.HasMany<typeof ChannelUser>

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

    @manyToMany(() => User, {
        pivotTable: 'channel_users',
        pivotTimestamps: true,
    })
    declare users: relations.ManyToMany<typeof User>

    @hasMany(() => Kick, {
        foreignKey: 'channel_id',
    })
    declare kickedRecords: relations.HasMany<typeof Kick>

    @manyToMany(() => User, {
        pivotTable: 'kicks',
        pivotForeignKey: 'channel_id', // Foreign key in the pivot table referencing this model
        pivotRelatedForeignKey: 'kicked_id', // Foreign key in the pivot table referencing the related model
    })
    declare kickedUsers: relations.ManyToMany<typeof User> // A list of users kicked from this channel

    @manyToMany(() => User, {
        pivotTable: 'kicks',
        pivotForeignKey: 'channel_id',
        pivotRelatedForeignKey: 'kicker_id',
    })
    declare kickers: relations.ManyToMany<typeof User> // A list of users who kicked others in this channel
}
