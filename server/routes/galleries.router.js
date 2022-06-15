const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');



router.get('/:className', rejectUnauthenticated, (req, res) => {

    const className = req.params.className;

    console.log('this is the className in galleries router:',className);

    const sqlQuery = `SELECT (gallery.id), gallery.name, image.url, classroom.class_name
    FROM gallery 
    JOIN class_gallery ON gallery.id = class_gallery.gallery_id
    JOIN classroom ON classroom.id = class_gallery.class_id
    LEFT JOIN gallery_image ON gallery.id = gallery_image.gallery_id
    LEFT JOIN image ON image.id = gallery_image.image_id
    WHERE classroom.class_name = ($1)
    ORDER BY gallery.id DESC;`;
    const sqlValues = [className]
    pool.query(sqlQuery, sqlValues)
    .then( result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: Get class Galleries', err);
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