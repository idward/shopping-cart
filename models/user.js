var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

//加密password
userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

//验证密码是否一致
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('user', userSchema);

module.exports = User;





