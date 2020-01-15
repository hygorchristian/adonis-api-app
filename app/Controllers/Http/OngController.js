'use strict'

const Ong = use('App/Models/Ong')

class OngController {
  async index ({ request }) {
    const {
      page = 1,
      perPage = 10,
      sort = 'created_at',
      order = 'ASC'
    } = request.get()

    const query = Ong.query().orderBy(sort, order)
    const ongs = await query.paginate(page, perPage)
    return ongs
  }

  async show ({ params }) {
    const ong = await Ong.findOrFail(params.id)
    return ong
  }

  async store ({ request }) {
    const data = request.only([
      'slug', 
      'name', 
      'description', 
      'birth', 
    ])

    const ong = await Ong.create(data)

    return ong
  }

  async update ({ params, request }) {
    const ong = await Ong.findOrFail(params.id)
    const data = request.only([
      'slug', 
      'name', 
      'description', 
      'birth', 
    ])

    ong.merge(data)

    await ong.save()

    return ong
  }

  async destroy ({ params }) {
    const ong = await Ong.findOrFail(params.id)
    ong.delete()
  }
}

module.exports = OngController
