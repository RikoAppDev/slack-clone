import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Message from './message.ts'
import Channel from './channel.ts'
import * as relations from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import Kick from '#models/kick'
import { UserStatus } from '#models/enum'
import ChannelUser from '#models/channel_user'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
    static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare id: string

    @beforeCreate()
    static assignUuid(user: User) {
        user.id = randomUUID()
    }

    @column()
    declare firstname: string

    @column()
    declare lastname: string

    @column()
    declare username: string

    @column()
    declare status: UserStatus

    @column()
    declare email: string

    @column({ serializeAs: null })
    declare password: string

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updated_at: DateTime

    @hasMany(() => Message, {
        foreignKey: 'sender_id',
    })
    declare messages: relations.HasMany<typeof Message>

    @hasMany(() => Message, {
        foreignKey: 'mentioned_user_id',
    })
    declare mentions: relations.HasMany<typeof Message>

    @hasMany(() => ChannelUser)
    declare channelMemberships: relations.HasMany<typeof ChannelUser>

    @manyToMany(() => Channel, {
        pivotTable: 'channel_users',
        pivotTimestamps: true,
    })
    declare channels: relations.ManyToMany<typeof Channel>

    @hasMany(() => Kick, {
        foreignKey: 'kicked_id',
    })
    declare wasKicked: relations.HasMany<typeof Kick>

    @hasMany(() => Kick, {
        foreignKey: 'kicker_id',
    })
    declare kickedOthers: relations.HasMany<typeof Kick>

    @manyToMany(() => Channel, {
        pivotTable: 'kicks', // Define the pivot table
        pivotForeignKey: 'kicked_id', // Foreign key in the pivot table referencing this model
        pivotRelatedForeignKey: 'channel_id', // Foreign key in the pivot table referencing the related model
        pivotTimestamps: true, // Include timestamps if you have them
    })
    declare kickedFromChannels: relations.ManyToMany<typeof Channel> // A list of channels this user was kicked from

    @manyToMany(() => Channel, {
        pivotTable: 'kicks',
        pivotForeignKey: 'kicker_id', // Foreign key in the pivot table referencing this model as the kicker
        pivotRelatedForeignKey: 'channel_id',
    })
    declare kickedOthersInChannels: relations.ManyToMany<typeof Channel> // A list of channels where this user kicked others

    static accessTokens = DbAccessTokensProvider.forModel(User)
}
