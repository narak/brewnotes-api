/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const fs = require('fs');
const path = require('path');

/**
 * server configuration
 */
const config = require('../config/');
const auth = require('./policies/auth.policy');
const database = require('../config/database');

// environment: development, testing, production
const environment = process.env.NODE_ENV;
database.connect(environment);

/**
 * express application
 */
const app = express();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'w' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('common'));

// gzip
app.use(compression());

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(
    helmet({
        dnsPrefetchControl: false,
        frameguard: false,
        ieNoOpen: false,
    })
);

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// secure your private routes with jwt authentication middleware
app.all('/private/*', (req, res, next) => auth(req, res, next));

// fill routes for express application
app.use('/public', mapRoutes(config.publicRoutes, 'api/controllers/'));
app.use('/private', mapRoutes(config.privateRoutes, 'api/controllers/'));

const server = http.Server(app);
server.listen(config.port, () => {
    if (
        environment !== 'production' &&
        environment !== 'development' &&
        environment !== 'testing'
    ) {
        console.error(
            `NODE_ENV is set to ${environment}, but only production and development are valid.`
        );
        process.exit(1);
    }
    console.log(`Server started at http://localhost:${config.port}`);
});
