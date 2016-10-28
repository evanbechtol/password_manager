var app = angular.module('pwmgr');

app.factory('authFactory', ['$q', '$timeout', '$http', '$cookies', '$rootScope', function ($q, $timeout, $http, $cookies, $rootScope) {
    var user = false;
    var factory = {};
    var userData = {};


    factory.isLoggedIn = function () {
        return !!user;
    };


    factory.getUserStatus = function () {
        return user;
    };


    factory.login = function (email, password) {
        var deferred = $q.defer();
        var data = {
            email: CryptoJS.AES.encrypt(email, '!@_pr3Ssur3C0ok_ER!').toString()
            , password: CryptoJS.AES.encrypt(password, '!@_pr3Ssur3C0ok_ER!').toString()
        };
        $http.post('/users/login', data)
            .then(function (data) {
                if (data.status === 200) {
                    user = true;
                    if ($cookies.get('session_id')) {
                        $cookies.remove('session_id');
                    }
                    $cookies.put('session_id', data.data.session_id);
                    $rootScope.session = data.data.session_id;
                    userData = data.data;
                    deferred.resolve(data.data);
                } else {
                    user = false;
                    userData = {};
                    deferred.reject(data);
                }
            }, function (err) {
                user = false;
                deferred.reject(err);
            });
        return deferred.promise;
    };


    factory.logout = function (session_id) {
        var deferred = $q.defer();
        var session_id = session_id;
        $http.post('/logout', session_id)
            .then(function (data) {
                $cookies.remove('session_id');
                $rootScope.session = null;
                user = false;
                userData = {};
                deferred.resolve(data.data);
            }, function (err) {
                user = false;
                userData = {};
                deferred.reject(err);
            });
        return deferred.promise;
    };

    /* TODO: Finish registration functionality and test! */
    factory.register = function (email, password) {
        var deferred = $q.defer();
        var data = {
            email: email
            , password: password
        };
        $http.post('/users', data)
            .then(function (data) {
                if (data.status === 200) {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                }
            }, function (err) {
                user = false;
                deferred.reject(err);
            });
        return deferred.promise;
    };

    return factory;
}]);