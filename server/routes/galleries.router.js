const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');



router.get('/', rejectUnauthenticated, (req, res) => {

    const query = `SELECT DISTINCT(gallery.id), gallery.name, image.url
    FROM gallery 
    LEFT JOIN gallery_image ON gallery.id = gallery_image.gallery_id
    LEFT JOIN image ON image.id = gallery_image.image_id
    ORDER BY gallery.id DESC;`;
    pool.query(query)
    .then( result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: Get all Galleries', err);
        res.sendStatus(500)
    })
})


router.post('/', rejectUnauthenticated, (req, res) => {
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

router.delete('/:id', rejectUnauthenticated, (req,res) => {
    const galleryId = req.params.id;
    const sqlQuery = 'DELETE FROM gallery WHERE id=$1;';
    const sqlValues = [galleryId];
    pool.query (sqlQuery, sqlValues)
    .then((result) => {console.log(result); res.sendStatus(200) })
    .catch((err) => {
        console.log('Error in Delete gallery', err);
        res.sendStatus(500);})

})