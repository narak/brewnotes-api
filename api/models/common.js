function hideMongoDetails(doc, obj) {
    delete obj.__v;
    obj.id = obj._id;
    delete obj._id;
    return obj;
}

const schemaOptions = {
    toJSON: {
        transform: hideMongoDetails,
    },
};

module.exports = {
    schemaOptions,
    hideMongoDetails,
};
