'use strict'

const Image = use('App/Models/Image')

class ImageController {
  async index ({ request }) {
    const {
      page = 1,
      perPage = 10,
      sort = 'created_at',
      order = 'ASC'
    } = request.get()

    const query = Image.query().orderBy(sort, order)
    const images = await query.paginate(page, perPage)
    return images
  }

  async show ({ params }) {
    const image = await Image.findOrFail(params.id)
    return image
  }

  async store ({ request }) {
    const data = request.only([
      'slug', 
      'name', 
      'description', 
      'birth', 
    ])

    const image = await Image.create(data)

    return image
  }

  async update ({ params, request }) {
    const image = await Image.findOrFail(params.id)
    const data = request.only([
      'slug', 
      'name', 
      'description', 
      'birth', 
    ])

    image.merge(data)

    await image.save()

    return image
  }

  async destroy ({ params }) {
    const image = await Image.findOrFail(params.id)
    image.delete()
  }
}

module.exports = ImageController
