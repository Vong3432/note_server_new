import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag';

export default class TagsController {
  public async index({ response }: HttpContextContract) {
    try {
      const tags = await Tag.all();
      return response.json({ data: tags });
    } catch (error) {
      return response.json(error)
    }
  }
}
