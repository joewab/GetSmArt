const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
/**
 * GET route template
 */
 router.get('/', rejectUnauthenticated, (req, res) => {

    const query = `SELECT * FROM classroom
                    ORDER BY classroom.id DESC;`;
    pool.query(query)
    .then( result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: Get all Classes', err);
        res.sendStatus(500)
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const className = req.body.className;
    console.log('this is class name in Post route',className);
    const sqlQuery = `INSERT INTO classroom ("class_name") VALUES ($1);`;
    const sqlValues = [className];
    pool.query (sqlQuery, sqlValues)
    .then((result) => { console.log(result); res.sendStatus(200) })
    .catch((err) => {
      console.log('Error in POST className', err);
      res.sendStatus(500);})
})

module.exports = router;
