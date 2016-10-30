var app = angular.module('myApp', ['ngRoute'])

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/login.html',
    controller: 'loginController'
  })
  .when('/dashboard', {
    templateUrl: '/dashboard.html',
    controller: 'dashController'
  })
  .when('/profile/:id', {
    templateUrl: '/profile.html',
    controller: 'profileController'
  })
  .otherwise({
    redirectTo: '/'
  })
})
