const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')



router.get('/', (req, res) => {

    const query = `SELECT * FROM gallery ORDER BY "id" DESC;`;
    pool.query(query)
    .then( result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: Get all Galleries', err);
        res.sendStatus(500)
    })
})



module.exports = router;