const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

const hooks = {
    beforeCreate(user) {
        user.password = bcryptService().password(user);
    },
};

const tableName = 'users';

const User = sequelize.define(
    'User',
    {
        uuid: { type: Sequelize.UUID, primaryKey: true },
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
        },
    },
    { hooks, tableName }
);

// eslint-disable-next-line
User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
};

module.exports = User;
