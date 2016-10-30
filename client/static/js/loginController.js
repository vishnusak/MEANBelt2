app.controller('loginController', ['$scope', '$location', 'listFactory', function($scope, $location, LF){
  if (LF.getUser()){
    $location.url('/dashboard')
  }

  var serverRoute = '/'

  $scope.userName   = ''
  $scope.loginError = ''

  $scope.loginUser = function(){
    if ($scope.userName){
      $scope.loginError = ''
      LF.addUser(serverRoute, {userName: $scope.userName})
      .then(function(serverData){
        if ('error' in serverData.data){
          $scope.loginError = serverData.data['error']
        } else {
          LF.setUser($scope.userName)
          $location.url('/dashboard')
        }
      })
    } else {
      $scope.loginError = "Please enter a name to login"
    }
  }
}])
