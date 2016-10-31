var app = angular.module('pwmgr');
/* TODO: Add masterPassword as field to send in all requests
 * TODO: Replace encryption by AES with hashing algorithm. */
app.factory('accountFactory', ['$q', '$timeout', '$http', '$cookies', '$rootScope', function ($q, $timeout, $http, $cookies, $rootScope) {
    var factory = {};
    var accountData = {};


    factory.create = function (account) {
        var deferred = $q.defer();
        var encryptedAccount = {};
        encryptedAccount.name = CryptoJS.AES.encrypt(account.name, '!@_pr3Ssur3C0ok_ER!').toString();
        encryptedAccount.username = CryptoJS.AES.encrypt(account.username, '!@_pr3Ssur3C0ok_ER!').toString();
        encryptedAccount.password = CryptoJS.AES.encrypt(account.password, '!@_pr3Ssur3C0ok_ER!').toString();

        $http.post('/account/create', encryptedAccount)
            .then(function (data) {
                if (data.status === 200) {
                    deferred.resolve('Account created successfully!');
                } else {
                    deferred.reject('Error creating account: ' + data);
                }
            }, function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };


    factory.get = function () {
        var deferred = $q.defer();
        var encryptedAccount = {};
        encryptedAccount.name = CryptoJS.AES.encrypt(account.name, '!@_pr3Ssur3C0ok_ER!').toString();
        encryptedAccount.username = CryptoJS.AES.encrypt(account.username, '!@_pr3Ssur3C0ok_ER!').toString();
        encryptedAccount.masterPassword = CryptoJS.AES.encrypt(account.masterPassword, '!@_pr3Ssur3C0ok_ER!').toString();

        $http.post('/account/get', encryptedAccount)
            .then(function (data) {
                if (data.status === 200) {
                    deferred.resolve('Account created successfully!');
                } else {
                    deferred.reject('Error creating account: ' + data);
                }
            }, function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };


    factory.update = function () {

    };


    factory.delete = function () {

    };

    return factory;
}]);