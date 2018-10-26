const mongoose = require('mongoose');
const bcryptService = require('../services/bcrypt.service');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: String,
});

UserSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    } else {
        user.password = bcryptService().password(user);
        return next();
    }
});

module.exports = mongoose.model('User', UserSchema);
