var express = require('express');
var router = express.Router();
var passport = require('../auth/passport-config');

/* GET users listing. */
router.get('/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), errorMessages: messages});
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/users/signup',
    badRequestMessage: 'email or password is not empty',
    failureFlash: true
}), function (req, res, next) {
    res.redirect('/users/signin');
});

router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin',{csrfToken:req.csrfToken(),errorMessages:messages});
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/users/signin',
    badRequestMessage: 'email or password is not empty',
    failureFlash: true
}), function (req, res, next) {
    res.redirect('/users/profile');
});

router.get('/profile', function (req, res, next) {
    res.render('user/profile');
});

module.exports = router;
