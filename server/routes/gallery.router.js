const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM image ORDER BY "id" DESC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all images', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => {
  const queryText = 'SELECT * FROM image WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT image query', err);
      res.sendStatus(500);
    });
});


module.exports = router;