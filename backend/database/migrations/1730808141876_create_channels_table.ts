import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Channels extends BaseSchema {
    protected tableName = 'channels'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('name', 80).notNullable().unique()
            table.boolean('is_private').notNullable().defaultTo(true)
            table.timestamp('last_activity_at', { useTz: true }).notNullable()
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.uuid('created_by').references('id').inTable('users').onDelete('CASCADE')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
