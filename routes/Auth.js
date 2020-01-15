const Route = use('Route')

/*
|--------------------------------------------------------------------------
| Permissions
|--------------------------------------------------------------------------
|
| Routes for the Permissions resource
|
*/

Route.post('/auth', 'AuthController.store').validator('Auth')
Route.delete('/auth', 'AuthController.destroy').middleware(['auth'])
