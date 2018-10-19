const Sequelize = require('sequelize');
const errorResponse = require('./errorResponse');

module.exports = function handleError(res, err) {
    if (err instanceof Sequelize.ValidationError) {
        return errorResponse(res, 400, err.errors.map(e => e.message));
    } else {
        console.error(err);
        return errorResponse(res, 500, 'Internal server error');
    }
};
