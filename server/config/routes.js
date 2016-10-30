console.log(`BucketList - routes loaded`)

var users = require('../controllers/users')

module.exports = function(app){
  app.post('/', users.addUser)

  app.get('/dashboard', users.getAllUsers)
  app.get('/dashboard/:user', users.getList)
  app.post('/dashboard/:user', users.addList)
  app.put('/dashboard/:listId', users.updateListStatus)

  app.get('/user/:userId', users.getListById)
}
