var app = angular.module('pwmgr');

/* TODO: Need to populate dash controller for use with passwords */
app.controller('dashCtrl', ['$scope', '$location', 'authFactory', '$rootScope', function ($scope, $location, authFactory, $rootScope) {
    $scope.actions = ['Create', 'Get', 'Update', 'Delete'];
    $scope.user = {};
    $scope.submit = function () {

    };
}]);