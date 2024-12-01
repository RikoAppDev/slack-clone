import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'messages'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('content').notNullable()
            table.timestamp('sent_at', { useTz: true }).notNullable()
            table.uuid('sender_id').references('id').inTable('users').onDelete('CASCADE')
            table.uuid('channel_id').references('id').inTable('channels').onDelete('CASCADE')

            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
