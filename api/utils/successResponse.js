module.exports = function successResponse(res, data) {
    return res.status(200).json(data);
};
