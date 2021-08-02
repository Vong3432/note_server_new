import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note'
import Tag from 'App/Models/Tag';
import User from 'App/Models/User';
import CreateNoteValidator from 'App/Validators/CreateNoteValidator';
import UpdateNoteValidator from 'App/Validators/UpdateNoteValidator';

export default class NotesController {
  public async index({ response }: HttpContextContract) {
    try {
      const notes = await Note.query().preload('tags').preload('locations');
      return response.json({ data: notes });
    } catch (error) {
      return response.json(error)
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateNoteValidator);
      const user = await User.findByOrFail('id', payload.user_id);

      const newNote = new Note()
      const tags: Tag[] = await this.insertTags(payload.tags)

      newNote.fill({
        title: payload.title,
        description: payload.description
      });

      await newNote.related('locations').create({
        uniqueLngLatId: payload.geolocation.uniqueLngLatId,
        lat: payload.geolocation.lat,
        lng: payload.geolocation.lng,
      }, {
        name: payload.geolocation.name
      });

      const ids = tags.map(t => t.id)

      await newNote
        .related('tags')
        .sync(ids);

      await user.related('notes').save(newNote);

      return response.json({ data: newNote, msg: 'Add successfully' });
    } catch (error) {
      console.log(error)
      return response.json(error)
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const note = await Note.query().preload('locations').preload('tags').where('id', params.id).firstOrFail();
      return response.json({ data: note.serialize() });
    } catch (error) {
      return response.json(error)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const payload = await request.validate(UpdateNoteValidator);
      const note = await Note
        .query()
        .preload('tags')
        .preload('locations')
        .where('id', params.id)
        .where('user_id', payload.user_id)
        .firstOrFail();
      let tags: Tag[] = [];

      if (payload.geolocation) {
        await note.related('locations').detach();
        await note.related('locations').create({
          uniqueLngLatId: payload.geolocation.uniqueLngLatId,
          lat: payload.geolocation.lat,
          lng: payload.geolocation.lng
        }, {
          name: payload.geolocation.name
        });
      }

      if (payload.tags && payload.tags.length > 0) {
        tags = await this.insertTags(payload.tags);
      }
      const ids = tags.map(t => t.id) // it is fucking empty

      await note
        .related('tags')
        .sync(ids);

      await note.merge({ ...payload.note }).save();
      return response.json({ data: note.serialize(), msg: 'Updated successfully' });
    } catch (error) {
      console.log(error)
      return response.json(error)
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const note = await Note.find(params.id);
      if (note) {
        await note.delete();
      }
      return response.json({ data: `${note?.$isDeleted ? 'Note is deleted' : 'Note is not deleted'}` });
    } catch (error) {
      return response.json(error)
    }
  }

  async insertTags(data): Promise<Tag[]> {

    return Promise.all(data.map(async tag => {
      const findTag = await Tag.findBy('name', tag)
      if (findTag != null) return findTag;

      const newTag = new Tag();
      return await newTag.fill({ name: tag }).save();

    }));
  }
}
