import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'kicks'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table
                .uuid('kicked_id')
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
            table
                .uuid('kicker_id')
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')

            table.primary(['kicked_id', 'channel_id', 'kicker_id'])

            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
