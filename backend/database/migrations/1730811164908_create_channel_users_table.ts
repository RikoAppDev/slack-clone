import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'channel_users'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table
                .uuid('user_id')
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')

            table
                .uuid('channel_id')
                .notNullable()
                .references('id')
                .inTable('channels')
                .onDelete('CASCADE')

            table.primary(['user_id', 'channel_id'])
            table.timestamp('created_at').defaultTo(this.now())
            table.timestamp('updated_at').defaultTo(this.now())
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
