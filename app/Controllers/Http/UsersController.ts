import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';
import LoginUserValidator from 'App/Validators/LoginUserValidator';

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateUserValidator);
      const user = await (await User.create({ ...payload })).save()
      return response.json({ data: user, msg: 'User registered successfully' });
    } catch (error) {
      return response.json(error);
    }
  }

  public async login({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(LoginUserValidator);
      const user = await User.query().where('username', payload.username).where('password', payload.password).firstOrFail();
      return response.json({ data: user, msg: 'Login successfully' });
    } catch (error) {
      return response.json(error);
    }
  }
}
