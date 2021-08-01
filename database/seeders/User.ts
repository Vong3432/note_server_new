import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.updateOrCreate({
      username: 'admin'
    }, {
      username: 'admin',
      password: '12345678'
    })
  }
}
