var app = angular.module('pwmgr');
app.controller('loginCtrl', ['$resource', '$log', '$location', '$rootScope', '$scope', 'authFactory', '$timeout', '$window', function ($resource, $log, $location, $rootScope, $scope, authFactory, $timeout, $window) {
    $scope.user = {};
    $scope.error = undefined;
    $scope.message = undefined;
    $scope.login = function() {
        authFactory.login($scope.user.username, $scope.user.password)
            .then(function (res) {
                $rootScope.session = res.session_id;
                $scope.error = null;
                $scope.message = 'Logged in, redirecting!';
                $timeout(function () { $location.path('/dashboard') }, 1000);
            }, function (err) {
                $scope.error = err.error;
                $rootScope.session = null;
            });
    };
}]);
