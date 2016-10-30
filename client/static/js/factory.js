app.factory('listFactory', ['$http', function($http){
  var factory = {},
      curUser = ''

  factory.getUser = function(){
    return curUser
  }
  factory.setUser = function(value){
    curUser = value
  }

  factory.logoutUser = function(){
    curUser = ''
  }

  factory.addUser = function(serverRoute, user){
    return $http({
      method: 'POST',
      url: serverRoute,
      data: user
    })
  }

  factory.getUsers = function(serverRoute){
    return $http({
      method: 'GET',
      url: serverRoute
    })
  }

  factory.getRowsForUser = function(serverRoute){
    return $http({
      method: 'GET',
      url: serverRoute
    })
  }

  factory.add = function(serverRoute, data){
    return $http({
      method: 'POST',
      url: serverRoute,
      data: data
    })
  }

  factory.update = function(serverRoute){
    return $http({
      method: 'PUT',
      url: serverRoute
    })
  }

  return factory
}])
