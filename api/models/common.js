/**
 * Default json transform for all models to hide the mongo crap
 * @param  {Object} doc The document object presumable -_-
 * @param  {Object} obj The object that's finally stringified
 * @return {Object}     The updated object value
 */
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
