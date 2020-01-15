const Route = use('Route')

/*
|--------------------------------------------------------------------------
| Role
|--------------------------------------------------------------------------
|
| Routes for the Role resource
|
*/

Route.post('/roles', 'RoleController.store').validator('Role/CreateRole').middleware(['auth'])
Route.get('/roles', 'RoleController.index')
Route.get('/roles/:id', 'RoleController.show')
Route.put('/roles/:id', 'RoleController.update').validator('Role/UpdateRole').middleware(['auth'])
Route.delete('/roles/:id', 'RoleController.destroy').middleware(['auth'])
