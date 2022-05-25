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

router.post('/', (req, res) => {
    const image = req.body;
    console.log('this is the req dot body:',image);
    const sqlText = `INSERT INTO  "image" 
        ("url", "description", "artist", "title", "year", "media")
        VALUES($1,$2,$3,$4,$5,$6);`;
    const sqlValues = [image.imageUrl, image.description, image.artist, image.title, image.year, image.media];
    pool.query(sqlText, sqlValues)
    .then((result) => { console.log(result); res.sendStatus(200) })
    .catch((err) => {
      console.log('Error in POST image', err);
      res.sendStatus(500);
    });
})

router.delete('/:id', (req, res) => {
    const sqlText = 'DELETE  FROM image WHERE id=$1';
    pool.query(sqlText, [req.params.id])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing DELETE image query', err);
        res.sendStatus(500);
      });
  });

module.exports = router;