const uuid = require('uuid/v1');

const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const handleError = require('../utils/handleError');
const errorResponse = require('../utils/errorResponse');
const successResponse = require('../utils/successResponse');

const UserController = () => {
    const register = async (req, res) => {
        const { body } = req;

        if (body.password === body.password2) {
            try {

                const user = await User.create({
                    uuid: uuid(),
                    email: body.email,
                    password: body.password,
                });
                const token = authService().issue({ id: user.id });

                return successResponse(res, { token, user });
            } catch (err) {
                return handleError(res, err);
            }
        }

        return errorResponse(res, 400, "Passwords don't match");
    };

    const login = async (req, res) => {
        const { email, password } = req.body;

        if (email && password) {
            try {
                const user = await User.findOne({
                    where: {
                        email,
                    },
                });

                if (user && bcryptService().comparePassword(password, user.password)) {
                    const token = authService().issue({ id: user.id });

                    return successResponse(res, { token, user });
                }

                return errorResponse(res, 401, 'Unauthorized');
            } catch (err) {
                console.log(err);
                return errorResponse(res, 500, 'Internal server error');
            }
        }

        return errorResponse(res, 400, 'Email or password is wrong');
    };

    const validate = (req, res) => {
        const { token } = req.body;

        authService().verify(token, err => {
            if (err) {
                return errorResponse(res, 401, 'Invalid Token', { isvalid: false });
            }

            return successResponse(res, { isvalid: true });
        });
    };

    const getAll = async (req, res) => {
        try {
            const users = await User.findAll();

            return successResponse(res, { rows: users });
        } catch (err) {
            console.log(err);
            return errorResponse(res, 500, 'Internal server error');
        }
    };

    return {
        register,
        login,
        validate,
        getAll,
    };
};

module.exports = UserController;
