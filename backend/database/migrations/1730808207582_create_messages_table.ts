import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'messages'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('content').notNullable()
            table.timestamp('sent_at', { useTz: true })
            table
                .integer('sender_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
            table
                .integer('channel_id')
                .unsigned()
                .references('id')
                .inTable('channels')
                .onDelete('CASCADE')
            table
                .integer('mentions')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
