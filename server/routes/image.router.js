const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
    const sqlQuery = `SELECT image.id, image.url, image.description, image.artist, image.title, image.year, image.media, gallery.id AS gallery_id
    FROM image JOIN gallery_image ON image.id = gallery_image.image_id
    JOIN gallery ON gallery.id = gallery_image.gallery_id
    WHERE image.id=$1;`;
    const sqlValues = [req.params.id]
    pool.query(sqlQuery, sqlValues)
        .then((result) => { res.send(result.rows); console.log('this is the get one image result:', result.rows); })
        .catch((err) => {
            console.log('Error completing SELECT one image query', err);
            res.sendStatus(500);
        });
});



module.exports = router;