var app = angular.module('pwmgr');

/* TODO: Need to populate dash controller for use with passwords */
app.controller('dashCtrl', ['$scope', '$location', 'accountFactory', '$rootScope', function ($scope, $location, accountFactory, $rootScope) {
    $scope.actions = ['Create', 'Get', 'Update', 'Delete'];
    $scope.user = {};
    $scope.message = $scope.error = undefined;

    $scope.submit = function () {
        accountFactory.create($scope.user).then(function (account) {
            $scope.message = 'Account created Successfully';
            $scope.error = undefined;
        }, function (err) {
            $scope.error = 'Error creating account: ' + err;
            $scope.message = undefined;
        });
    };
}]);