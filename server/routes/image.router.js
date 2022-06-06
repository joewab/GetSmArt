const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('params:', req.params.id);
    const sqlQuery = `SELECT image.id, image.url, image.description, image.artist, image.title, image.year, image.media, gallery.id AS gallery_id
    FROM image JOIN gallery_image ON image.id = gallery_image.image_id
    JOIN gallery ON gallery.id = gallery_image.gallery_id
    WHERE image.id=$1;`;
    const sqlValues = [req.params.id]
    pool.query(sqlQuery, sqlValues)
        .then((result) => { res.send(result.rows[0]); console.log('this is the get one image result:', result.rows); })
        .catch((err) => {
            console.log('Error completing SELECT one image query', err);
            res.sendStatus(500);
        });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
    const imageToEdit = req.body;
    const imageId = req.params.id
    console.log('image to update:', imageToEdit);
    const sqlQuery = `
    UPDATE image 
      SET 
        description = $1,
        artist = $2,
        title = $3,
        year = $4,
        media = $5
      WHERE id = $6;
  `;
    const sqlValues = [imageToEdit.description,
    imageToEdit.artist,
    imageToEdit.title,
    imageToEdit.year,
    imageToEdit.media,
        imageId
    ]
    pool.query(sqlQuery, sqlValues)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Update image failed: ', err);
      res.sendStatus(500);
    });
})



module.exports = router;