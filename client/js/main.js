var app = angular.module('pwmgr', ['ngRoute', 'ngResource', 'ngMaterial', 'ngAnimate', 'ngCookies', 'ngMessages']);
/* TODO: Need to include crypto libraries for secure transmission to server */
app.factory('_', ['$window', function ($window) {
    return $window._;
}]);

app.run(function ($rootScope, $location, $route, $cookies) {
    if ($cookies.get('session_id')){
        $rootScope.session = $cookies.get('session_id');
    }

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.templateUrl === '/html/dashboard.html' && !$cookies.get('session_id')) {
            $location.path('/login');
            $route.reload();
        }
    });
});

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('blue-grey');
});