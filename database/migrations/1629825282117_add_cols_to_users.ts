import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('email').notNullable()
      table.string('password').nullable().alter()
      table.string('access_token').nullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('email')
      table.string('password').notNullable().alter()
      table.dropColumn('access_token')
    })
  }
}
