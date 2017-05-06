var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/signup', function (req, res, next) {
    res.render('user/signup', {csrfToken: req.csrfToken()});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true
}));

router.get('/profile', function (req, res, next) {
    res.render('user/profile');
});

module.exports = router;
