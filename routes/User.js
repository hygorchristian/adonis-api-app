const Route = use('Route')

Route.post('/users', 'UserController.store')
Route.get('/users', 'UserController.index')
Route.get('/users/:id', 'UserController.show')
Route.put('/users/:id', 'UserController.update').middleware(['auth'])
Route.delete('/users/:id', 'UserController.destroy').middleware(['auth'])
