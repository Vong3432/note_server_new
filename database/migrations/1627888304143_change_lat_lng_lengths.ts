import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Locations extends BaseSchema {
  protected tableName = 'locations'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.decimal('lat', 11, 7).notNullable().alter()
      table.decimal('lng', 11, 7).notNullable().alter()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.float('lat').notNullable().alter()
      table.float('lng').notNullable().alter()
    })
  }
}
