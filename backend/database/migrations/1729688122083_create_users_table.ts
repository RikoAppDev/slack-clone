import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'users'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('firstname', 100).notNullable()
            table.string('lastname', 100).notNullable()
            table.string('username', 80).notNullable()
            table
                .enu('status', ['online', 'dnd', 'offline'], {
                    useNative: true,
                    enumName: 'user_status',
                    existingType: false,
                    schemaName: 'public',
                })
                .notNullable()
                .defaultTo('online')
            table.string('email', 254).notNullable().unique()
            table.string('password').notNullable()
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    async down() {
        this.schema.raw('DROP TYPE IF EXISTS "user_status" cascade')

        this.schema.dropTable(this.tableName)
    }
}
