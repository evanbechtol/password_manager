var app = angular.module('pwmgr');
app.controller('loginCtrl', ['$resource', '$log', '$location', '$rootScope', '$scope', 'authFactory', '$timeout', '$window', function ($resource, $log, $location, $rootScope, $scope, authFactory, $timeout, $window) {
    $scope.user = {};
    $scope.error = undefined;
    $scope.message = undefined;

    $scope.login = function() {
        authFactory.login($scope.user.email, $scope.user.password)
            .then(function (res) {
                $rootScope.session = res.session_id;
                $scope.error = null;
                $scope.message = 'Logged in, redirecting!';
                $timeout(function () { $location.path('/dashboard') }, 1000);
            }, function (err) {
                $scope.error = 'Account not found, please check that your email and password are correct.';
                $rootScope.session = null;
            });
    };

    $scope.register = function () {
        authFactory.register($scope.user.email, $scope.user.password)
            .then(function (res, status) {
                $scope.error = null;
                $scope.message = 'Account created successfully, you can now login!';
                $timeout(function () { $location.path('/dashboard') }, 1000);
            }, function (err) {
                console.log(err.data.name);
                if (err.data.name === 'SequelizeUniqueConstraintError') {
                    $scope.error = 'Account already exists with that email.'
                }
            });
    };
}]);
