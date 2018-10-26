const Note = require('../models/Note');

const handleError = require('../utils/handleError');
const errorResponse = require('../utils/errorResponse');
const successResponse = require('../utils/successResponse');

const NoteController = () => {
    const create = async (req, res) => {
        const { body, json } = req;

        try {
            const note = await Note.create(body);

            return successResponse(res, undefined, note);
        } catch (err) {
            return handleError(res, err);
        }
    };

    const update = async (req, res) => {
        try {
            const id = req.params.id;
            const { body } = req;
            await Note.replaceOne({ _id: id }, body);
            const note = await Note.findById(id);
            return successResponse(res, undefined, note);
        } catch (err) {
            return handleError(res, err);
        }
    };

    const get = async (req, res) => {
        try {
            const id = req.params.id;
            const note = await Note.findById(id);
            return successResponse(res, undefined, note);
        } catch (err) {
            console.log(err);
            return errorResponse(res, 500, 'Internal server error');
        }
    };

    const getAll = async (req, res) => {
        try {
            const notes = await Note.find();
            return successResponse(res, undefined, notes);
        } catch (err) {
            console.log(err);
            return errorResponse(res, 500, 'Internal server error');
        }
    };

    const _delete = async (req, res) => {
        try {
            const id = req.params.id;
            const note = await Note.findByIdAndRemove(id);
            return successResponse(res, undefined, note);
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
