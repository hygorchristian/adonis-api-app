const Route = use('Route')

/*
|--------------------------------------------------------------------------
| Image
|--------------------------------------------------------------------------
|
| Routes for the Image resource
|
*/

Route.post('/images', 'ImageController.store').validator('Image/CreateImage').middleware(['auth'])
Route.get('/images', 'ImageController.index')
Route.get('/images/:id', 'ImageController.show')
Route.put('/images/:id', 'ImageController.update').validator('Image/UpdateImage').middleware(['auth'])
Route.delete('/images/:id', 'ImageController.destroy').middleware(['auth'])
