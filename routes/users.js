var express = require('express');
var router = express.Router();
var passport = require('../auth/passport-config');

/* GET users listing. */
router.get('/signup', function (req, res, next) {
    res.render('user/signup', {csrfToken: req.csrfToken(), error: req.flash('error')});
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/users/signup',
    failureFlash: true
}), function (req, res, next) {
    res.redirect('/users/profile');
});

router.get('/profile', function (req, res, next) {
    res.render('user/profile');
});

module.exports = router;
