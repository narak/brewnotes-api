const uuid = require('uuid/v1');

const Note = require('../models/Note');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const handleError = require('../utils/handleError');
const errorResponse = require('../utils/errorResponse');
const successResponse = require('../utils/successResponse');

const NoteController = () => {
    const create = async (req, res) => {
        const { body } = req;

        try {
            body.uuid = uuid();
            const note = await Note.create(body);

            return successResponse(res, { rows: [note] });
        } catch (err) {
            return handleError(res, err);
        }
    };

    const update = async (req, res) => {
        try {
            const uuid = req.param.uuid;
            const { body } = req;
            const note = await Note.findOne({ uuid });
            await note.update(body);
            return successResponse(res, { rows: [note] });
        } catch (err) {
            return handleError(res, err);
        }
    };

    const get = async (req, res) => {
        try {
            const uuid = req.param.uuid;
            const note = await Note.findOne({ uuid });
            return successResponse(res, { rows: [note] });
        } catch (err) {
            console.log(err);
            return errorResponse(res, 500, 'Internal server error');
        }
    };

    const getAll = async (req, res) => {
        try {
            const notes = await Note.findAll();

            return successResponse(res, { rows: notes });
        } catch (err) {
            console.log(err);
            return errorResponse(res, 500, 'Internal server error');
        }
    };

    const _delete = async (req, res) => {
        try {
            const uuid = req.param.uuid;
            const note = await Note.findOne({ uuid });
            await note.destroy();
            return successResponse(res, { rows: [note] });
        } catch (err) {
            return handleError(res, err);
        }
    };

    return {
        create,
        update,
        get,
        getAll,
        delete: _delete,
    };
};

module.exports = NoteController;
