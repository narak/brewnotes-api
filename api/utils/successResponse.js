module.exports = function successResponse(res, meta, rows) {
    if (!Array.isArray(rows)) {
        rows = [rows];
    }
    return res.status(200).json(Object.assign({ rows }, meta));
};
