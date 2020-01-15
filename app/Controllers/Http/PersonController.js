'use strict'

const Person = use('App/Models/Person')

class PersonController {
  async index ({ request }) {
    const {
      page = 1,
      perPage = 10,
      sort = 'created_at',
      order = 'ASC'
    } = request.get()

    const query = Person.query().orderBy(sort, order)
    const people = await query.paginate(page, perPage)
    return people
  }

  async show ({ params }) {
    const person = await Person.findOrFail(params.id)
    return person
  }

  async store ({ request }) {
    const data = request.only([
      'slug', 
      'name', 
      'description', 
      'birth', 
    ])

    const person = await Person.create(data)

    return person
  }

  async update ({ params, request }) {
    const person = await Person.findOrFail(params.id)
    const data = request.only([
      'slug', 
      'name', 
      'description', 
      'birth', 
    ])

    person.merge(data)

    await person.save()

    return person
  }

  async destroy ({ params }) {
    const person = await Person.findOrFail(params.id)
    person.delete()
  }
}

module.exports = PersonController
