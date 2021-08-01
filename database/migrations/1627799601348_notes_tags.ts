import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NotesTags extends BaseSchema {
  protected tableName = 'notes_tags'

  public async up() {
    this.schema.createTableIfNotExists(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('note_id').unsigned().notNullable()
      table.integer('tag_id').unsigned().notNullable()
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
