var express = require('express');
const {faker} = require("@faker-js/faker");
var router = express.Router();

router.get('/staff', function(req, res, next) {
    const data = [];
    const numItems = Math.random() * 10 + 5;
    for (let i = 0; i < numItems; i ++) {
        data.push({
            name: faker.name.fullName(),
            job: faker.hacker.adjective() + ' ' + faker.hacker.noun(),
            quote: faker.hacker.phrase(),
        })
    }
    res.json(data);
});

module.exports = router;
