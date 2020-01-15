const { test, trait, before, after } = use('Test/Suite')('Person')

const User = use('App/Models/User')
const Person = use('App/Models/Person')

trait('Test/ApiClient')
trait('Auth/Client')

const mock = {
  user: {
    email: 'teste@teste.com',
    username: 'tester',
    password: '123456',
  },
}

before(async () => {
  await User.create(mock.user)

  for (let i = 0; i < 5; i++) {
    await Person.create({
      slug: 'teste' + 1,
      name: 'teste' + 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta egestas laoreet. Ut in ligula quis risus ultrices interdum.' + 1,
      birth: '2020-01-09' + 1,
    })
  }
})

after(async () => {
  const user = await User.findByOrFail('email', mock.user.email)
  await user.delete()
})

test('Create person', async ({ client }) => {
  const user = await User.findByOrFail('email', mock.user.email)
  const data = {
    slug: 'teste',
    name: 'teste',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta egestas laoreet. Ut in ligula quis risus ultrices interdum.',
    birth: '2020-01-09',
  }

  const response = await client
    .post('/people')
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    slug: 'teste',
    name: 'teste',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta egestas laoreet. Ut in ligula quis risus ultrices interdum.',
    birth: '2020-01-09',
  })
})

test('Get one person', async ({ client }) => {
  const response = await client
    .get('/people/1')
    .end()

  response.assertStatus(200)
})

test('Get all persons', async ({ client }) => {
  const response = await client
    .get('/people')
    .end()

  response.assertStatus(200)

  response.assertJSONSubset({
    data: [{
      slug: 'teste',
      name: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta egestas laoreet. Ut in ligula quis risus ultrices interdum.',
      birth: '2020-01-09',
    }]
  })
})

test('Update person', async ({ client }) => {
  const user = await User.findByOrFail('email', mock.user.email)
  const data = {
    slug: 'teste-update',
    name: 'teste-update',
    description: 'Nam mollis, leo eu lacinia venenatis, sapien elit elementum sapien, non sollicitudin augue arcu ac urna. Maecenas et convallis neque.',
    birth: '2021-01-09',
  }

  const response = await client
    .put(`/people/1`)
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  response.assertJSONSubset({
    slug: data.slug
  })
})

test('Delete person', async ({ client }) => {
  const user = await User.findByOrFail('email', mock.user.email)

  const response = await client
    .delete(`/people/1`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)
})
