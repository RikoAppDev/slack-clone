import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Message from './message.ts'
import Channel from './channel.ts'
import * as relations from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare fullName: string | null

    @column()
    declare email: string

    @column({ serializeAs: null })
    declare password: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null

    @hasMany(() => Message, {
        foreignKey: 'senderId',
    })
    declare messages: relations.HasMany<typeof Message>

    @manyToMany(() => Channel, {
        pivotTable: 'channel_users',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'channel_id',
        pivotTimestamps: true,
    })
    declare channels: relations.ManyToMany<typeof Channel>

    static accessTokens = DbAccessTokensProvider.forModel(User)
}
