const { connect } = require('../config/database');

(async function() {
    const p = await connect(process.env.NODE_ENV);
})();
