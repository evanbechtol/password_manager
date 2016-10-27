var app = angular.module('pwmgr');
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/login.html',
            controller: 'loginCtrl'
            , access: {
                restricted: false
            }
        })
        .when('/dashboard', {
            templateUrl: '/views/dashboard.html',
            controller: 'dashCtrl'
            , access: {
                restricted: true
            }
        })
        .otherwise({redirectTo: '/'})
}]);
