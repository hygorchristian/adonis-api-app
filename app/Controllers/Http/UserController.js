'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const { permissions, roles, ...data } = request.only([
      'username', 'email', 'password', 'permissions', 'roles'
    ])

    const user = await User.create(data)

    if (roles) {
      await user.roles().attach(roles)
    }

    if (permissions) {
      await user.permissions().attach(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    return user
  }

  async index () {
    const users = await User.query().fetch()
    return users
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)
    await user.loadMany(['roles', 'permissions'])
    return user
  }

  async update ({ params, request, response, auth }) {
    const user = await User.findOrFail(params.id)

    const { permissions, roles, ...data } = request.only([
      'username', 'permissions', 'roles'
    ])

    if (user.id !== auth.user.id) {
      return response.status(403).send({ error: 'You have no permission to change other users information' })
    }

    user.merge(data)

    await user.save()

    if (roles) {
      await user.roles().sync(roles)
    }

    if (permissions) {
      await user.permissions().sync(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    return user
  }

  async destroy ({ params, auth, response }) {
    const user = await User.findOrFail(params.id)

    if (user.id !== auth.user.id) {
      return response.status(403).send({ error: 'You have no permission to delete this user' })
    }

    user.delete()
  }
}

module.exports = UserController
