var express = require('express');
var router = express.Router();
var config = require("../config.json");

router.get('/status', function(req, res, next) {
    const data = {
        status: 'UP',
        environment: config.environment,
    };

    if (config.environment !== 'production') {
        data.dbConnection = config.dbConnection
    } else {
        const connectionUrl = new URL(config.dbConnection)
        data.dbConnection = connectionUrl.host + connectionUrl.pathname
    }

    res.json(data);
});

module.exports = router;
