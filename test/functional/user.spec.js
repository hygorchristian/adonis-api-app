const { test, trait, before, after } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

const mock = {
  username: 'user_teste',
  password: '123456',
  email: 'teste@teste.com'
}

before(async () => {
  for (let i = 0; i < 5; i++) {
    await User.create({
      username: `${mock.username}${i}`,
      password: mock.password,
      email: `${mock.email}${i}`
    })
  }
})

after(async () => {
  for (let i = 0; i < 5; i++) {
    const user = await User.findByOrFail('email', `${mock.email}${i}`)
    await user.delete()
  }
})

test('Create user', async ({ client }) => {
  const data = {
    username: mock.username,
    password: mock.password,
    email: mock.email
  }

  const response = await client
    .post('/users')
    .send(data)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    username: mock.username,
    email: mock.email
  })
})

test('Get one user', async ({ client }) => {
  const response = await client
    .get('/users/2')
    .end()

  response.assertStatus(200)
})

test('Get all users', async ({ client }) => {
  const response = await client
    .get('/users')
    .end()

  response.assertStatus(200)

  response.assertJSONSubset([{
    username: mock.username + 1,
    email: mock.email + 1
  }])
})

test('Can\'t update other user info', async ({ client }) => {
  const user1 = await User.findByOrFail('email', `${mock.email}1`)
  const user2 = await User.findByOrFail('email', `${mock.email}2`)

  const data = {
    username: 'novo_user_name'
  }

  const response = await client
    .put(`/users/${user1.id}`)
    .send(data)
    .loginVia(user2, 'jwt')
    .end()

  response.assertStatus(403)
})

test('Update user', async ({ client }) => {
  const user = await User.findByOrFail('email', mock.email)
  const data = {
    username: 'novo_user_name'
  }

  const response = await client
    .put(`/users/${user.id}`)
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  response.assertJSONSubset({
    username: data.username,
    email: mock.email
  })
})

test('Delete user', async ({ client }) => {
  const user = await User.findByOrFail('email', mock.email)
  const data = {
    username: 'novo_user_name'
  }

  const response = await client
    .delete(`/users/${user.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)
})
