import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NotesLocations extends BaseSchema {
  protected tableName = 'notes_locations'

  public async up() {
    this.schema.createTableIfNotExists(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('note_id').unsigned().notNullable()
      table.integer('location_id').unsigned().notNullable()
      table.string('name').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
