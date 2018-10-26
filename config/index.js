const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');

const config = {
    privateRoutes,
    publicRoutes,
    port: process.env.PORT || '3001',
};

module.exports = config;
