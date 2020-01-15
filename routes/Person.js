const Route = use('Route')

/*
|--------------------------------------------------------------------------
| Person
|--------------------------------------------------------------------------
|
| Routes for the Person resource
|
*/

Route.post('/people', 'PersonController.store').validator('Person/CreatePerson').middleware(['auth'])
Route.get('/people', 'PersonController.index')
Route.get('/people/:id', 'PersonController.show')
Route.put('/people/:id', 'PersonController.update').validator('Person/UpdatePerson').middleware(['auth'])
Route.delete('/people/:id', 'PersonController.destroy').middleware(['auth'])
