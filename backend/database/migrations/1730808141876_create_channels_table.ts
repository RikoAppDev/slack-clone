import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Channels extends BaseSchema {
    protected tableName = 'channels'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('name', 80).notNullable().unique()
            table.boolean('is_private').notNullable().defaultTo(true)
            table.timestamp('last_activity', { useTz: true })
            table.timestamp('created_at', { useTz: true }).notNullable()
            table.timestamp('updated_at', { useTz: true })
            table
                .integer('created_by')
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
