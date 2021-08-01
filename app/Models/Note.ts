import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Location from './Location'
import Tag from './Tag'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public userId: number

  @column()
  public description: string

  @manyToMany(() => Location, {
    pivotColumns: ['name'],
    pivotTable: "notes_locations"
  })
  public locations: ManyToMany<typeof Location>

  @manyToMany(() => Tag, {
    pivotTable: "notes_tags"
  })
  public tags: ManyToMany<typeof Tag>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
