module.exports = function (db) {
    return {
        requireAuthentication: function (req, res, next) {
            // Get the Auth header
            var token = req.get('Auth');

            // Custom class method
            db.user.findByToken(token).then(function (user) {
                req.user = user;
                next();
            }, function () {
                res.status(401).send();
            });
        }
    };
};