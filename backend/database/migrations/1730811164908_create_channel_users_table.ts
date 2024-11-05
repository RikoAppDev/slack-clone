import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'channel_users'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
            table
                .integer('channel_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('channels')
                .onDelete('CASCADE')
            table.unique(['user_id', 'channel_id'])
            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
