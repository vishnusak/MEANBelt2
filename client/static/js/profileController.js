app.controller('profileController', ['$scope', '$location', 'listFactory', '$routeParams', function($scope, $location, LF, $routeParams){
  if (!LF.getUser()){
    $location.url('/')
  } else {
    $scope.userName   = LF.getUser()
  }
  var serverRoute = `/user/${$routeParams['id']}`

  $scope.listItems = []

  function getRows(){
    LF.getRowsForUser(serverRoute)
    .then(function(user){
      if (user){
        $scope.listItems = user.data['listItems']
        $scope.list      = true
        $scope.error     = ''
        $scope.user      = user.data['userName']
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
}])
