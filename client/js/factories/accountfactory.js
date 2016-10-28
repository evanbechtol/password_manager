var app = angular.module('pwmgr');

app.factory('accountFactory', ['$q', '$timeout', '$http', '$cookies', '$rootScope', function ($q, $timeout, $http, $cookies, $rootScope) {
    var factory = {};
    var accountData = {};


    factory.create = function (account) {
        var deferred = $q.defer();

        $http.post('/account/get', account)
            .then(function (data) {
                if (data.status === 200) {

                    deferred.resolve(data.data);
                } else {

                    deferred.reject(data);
                }
            }, function (err) {

                deferred.reject(err);
            });
        return deferred.promise;
    };


    factory.get = function () {

    };


    factory.update = function () {

    };


    factory.delete = function () {

    };

    return factory;
}]);