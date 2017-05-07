var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

//local strategy for passport
passport.use('local.signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        //验证提交字段
        req.checkBody('email','Email is required').notEmpty();
        req.checkBody('password','Password is required').notEmpty();
        req.checkBody('email', 'Invalid Eamil').isEmail();
        req.checkBody('password', 'Invalid Password').isLength({min: 4});
        var errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach(function (error) {
                messages.push(error.msg);
            })
            return done(null, false, req.flash('error', messages));
        }

        //查找用户是否存在
        User.findOne({email: email}, function (err, user) {
            if (err) {
                return done(null, false, {message: 'Database error.'});
            }
            if (user) {
                return done(null, false, {message: 'Email is already in user.'});
            }
            //用户不存在，则保存新用户
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            console.log(newUser);

            newUser.save(function (err, result) {
                if (err) {
                    return done(null, false, {message: 'save user failure.'})
                }
                return done(null, newUser);
            });
        });
    }));

//user put into session
passport.serializeUser(function (user, done) {
    done(null, user);
});
//user put into request
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.authenticateMiddleware = function authenticateMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        res.redirect('/');
    };
};

module.exports = passport;