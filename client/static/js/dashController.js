app.controller('dashController', ['$scope', '$location', 'listFactory', function($scope, $location, LF){
  if (!LF.getUser()){
    $location.url('/')
  } else {
    $scope.userName   = LF.getUser()
  }
  var serverRouteAllUsers = '/dashboard',
      serverRoute         = `/dashboard/${$scope.userName}`

  $scope.list = false
  $scope.error = ''
  $scope.listItems = []

  LF.getUsers(serverRouteAllUsers)
    .then(function(users){
      $scope.users = users.data
      $scope.error = ''
  })

  function getRows(){
    LF.getRowsForUser(serverRoute)
    .then(function(user){
      if (user){
        $scope.listItems = user.data['listItems']
        $scope.list      = true
        $scope.error     = ''
      }
    })
  }

  getRows()

  $scope.gotoHome = function(){
    $location.url('/dashboard')
  }

  $scope.logout = function(){
    LF.logoutUser()
    $location.url('/')
  }

  $scope.addToList = function(){
    if ($scope.title){
      if ($scope.title.length < 5){
        $scope.error = "Title too short. Must be at least 5 characters long"
      } else {
        $scope.error = ''
      }
    } else {
      $scope.error = "Title cannot be empty"
    }

    if (!$scope.error){
      if ($scope.desc){
        if ($scope.desc.length < 10){
          $scope.error = "Description too short. Must be at least 10 characters long"
        } else {
          $scope.error = ''
        }
      } else {
        $scope.error = "Description cannot be empty"
      }
    }

    if (!$scope.error){
      var newList = {
        title: $scope.title,
        desc: $scope.desc,
        tag: $scope.tag
      }
      LF.add(serverRoute, newList)
      .then(function(){
        getRows()
      })
    }
  }

  $scope.updateList = function(id){
    var serverRoute = `/dashboard/${id}`
    LF.update(serverRoute)
    .then(function(updatedList){
      getRows()
    })
  }

}])
