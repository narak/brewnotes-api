module.exports = function errorResponse(res, code, errors, additional) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    let response = { errors };

    if (additional) {
        Object.assign(response, additional);
    }

    return res.status(code).json(response);
};
