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


router.post('/', (req, res) => {
    const galleryName = req.body.galleryName;
    console.log('this is gallery name in Post route',galleryName);
    const sqlQuery = `INSERT INTO gallery ("name") VALUES ($1);`;
    const sqlValues = [galleryName];
    pool.query (sqlQuery, sqlValues)
    .then((result) => { console.log(result); res.sendStatus(200) })
    .catch((err) => {
      console.log('Error in POST galleryName', err);
      res.sendStatus(500);})
})
module.exports = router;

router.delete('/:id', (req,res) => {
    const galleryId = req.params.id;
    const sqlQuery = 'DELETE FROM gallery WHERE id=$1;';
    const sqlValues = [galleryId];
    pool.query (sqlQuery, sqlValues)
    .then((result) => {console.log(result); res.sendStatus(200) })
    .catch((err) => {
        console.log('Error in Delete gallery', err);
        res.sendStatus(500);})

})