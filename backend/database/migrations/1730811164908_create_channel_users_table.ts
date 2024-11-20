import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'channel_users'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            // Foreign Key for user_id
            table
                .uuid('user_id')
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')

            // Foreign Key for channel_id
            table
                .uuid('channel_id')
                .notNullable()
                .references('id')
                .inTable('channels')
                .onDelete('CASCADE')

            // Enum for role with member and admin
            table.enu('role', ['member', 'admin'], {
                useNative: true,
                enumName: 'user_role', // Enum name for PostgreSQL
                existingType: false,
                schemaName: 'public',
            })

            // Enum for status with active, banned, invited
            table.enu('status', ['active', 'banned', 'invited'], {
                useNative: true,
                enumName: 'channel_user_status', // Enum name for PostgreSQL
                existingType: false,
                schemaName: 'public',
            })

            // Primary key consisting of both user_id and channel_id
            table.primary(['user_id', 'channel_id'])

            // Timestamps
            table.timestamp('created_at').defaultTo(this.now())
            table.timestamp('updated_at').defaultTo(this.now())
        })
    }

    async down() {
        // Drop the enums before dropping the table
        this.schema.raw('DROP TYPE IF EXISTS "channel_user_status" cascade')
        this.schema.raw('DROP TYPE IF EXISTS "user_role" cascade')

        // Drop the table
        this.schema.dropTable(this.tableName)
    }
}
