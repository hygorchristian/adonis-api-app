'use strict'

const Role = use('App/Models/Role')

class RoleController {
  async index ({ request }) {
    const {
      page = 1,
      perPage = 10,
      sort = 'created_at',
      order = 'ASC'
    } = request.get()

    const query = Role.query().orderBy(sort, order)
    const roles = await query.paginate(page, perPage)
    return roles
  }

  async show ({ params }) {
    const role = await Role.findOrFail(params.id)
    return role
  }

  async store ({ request }) {
    const data = request.only([
      'slug', 
      'name', 
      'description', 
    ])

    const role = await Role.create(data)

    return role
  }

  async update ({ params, request }) {
    const role = await Role.findOrFail(params.id)
    const data = request.only([
      'slug', 
      'name', 
      'description', 
    ])

    role.merge(data)

    await role.save()

    return role
  }

  async destroy ({ params }) {
    const role = await Role.findOrFail(params.id)
    role.delete()
  }
}

module.exports = RoleController
