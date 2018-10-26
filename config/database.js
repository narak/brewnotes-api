/**
 * CHANGE THIS
 */
const config = {};
config.development = {
    dbName: 'brewnotes',
    user: '',
    pass: '',

    host: 'localhost',
    port: '27017',
};

config.testing = {
    dbName: 'brewnotes-test',
    user: '',
    pass: '',

    host: 'localhost',
    port: '27017',
};

config.production = {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,

    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
};

const mongoose = require('mongoose');

/**
 * Creates a connection object.
 * @param  {String}   env      Config environment to user
 * @param  {Function} callback Callback to inform connection status
 * @return {Object}            Promise object for connection
 */
module.exports = {
    connect: async function connect(env = 'development', callback) {
        const isTestEnv = env === 'testing';

        mongoose.Promise = global.Promise;

        const cfg = config[env];

        if (!cfg) {
            throw new Error(`Couldn't find config for environment ${env}.`);
        }

        const { host, port, user, pass, dbName } = cfg;
        const auth = user ? (pass ? `${user}:${pass}@` : `${user}@`) : '';

        !isTestEnv && console.log(`Connecting to 'mongodb://${user}:****@${host}:${port}/${dbName}'`);
        try {
            const conn = await mongoose.connect(
                `mongodb://${auth}${host}:${port}/${dbName}`,
                {
                    bufferCommands: false,
                    useNewUrlParser: true,
                }
            );
            if (callback) {
                callback(null, conn.connections[0]);
            } else {
                !isTestEnv && console.log('Connected successfully');
            }
        } catch (err) {
            if (callback) {
                callback(err);
            } else {
                throw new err();
            }
        }
    },

    close: function() {
        mongoose.connection.close();
    },
};
