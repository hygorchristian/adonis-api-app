const Route = use('Route')

/*
|--------------------------------------------------------------------------
| Ong
|--------------------------------------------------------------------------
|
| Routes for the Ong resource
|
*/

Route.post('/ongs', 'OngController.store').validator('Ong/CreateOng').middleware(['auth'])
Route.get('/ongs', 'OngController.index')
Route.get('/ongs/:id', 'OngController.show')
Route.put('/ongs/:id', 'OngController.update').validator('Ong/UpdateOng').middleware(['auth'])
Route.delete('/ongs/:id', 'OngController.destroy').middleware(['auth'])
