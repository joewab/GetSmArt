const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT image.id, image.url, image.description, image.artist, image.title, image.year, image.media, gallery.id AS gallery_id
  FROM image JOIN gallery_image ON image.id = gallery_image.image_id
  JOIN gallery ON gallery.id = gallery_image.gallery_id
  WHERE gallery.id=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => { res.send(result.rows); console.log('this is the get gallery result:', result.rows); })
        .catch((err) => {
            console.log('Error completing SELECT image query', err);
            res.sendStatus(500);
        });
});

router.post('/', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
    try {
        const image = req.body;
        await client.query('BEGIN')
        const sqlQuery = `
            INSERT INTO "image" ("url", "description", "artist", "title", "year", "media")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;`;
        const sqlValues = [image.imageUrl, image.description, image.artist, image.title, image.year, image.media]
        const imageInsertResults = await client.query(sqlQuery, sqlValues);
        const imageId = imageInsertResults.rows[0].id;
        const createGalleryImageLinkQuery = `INSERT INTO "gallery_image" ("gallery_id", "image_id") VALUES ($1, $2)`;
        const createGalleryImageLinkValues = [image.galleryId, imageId];
        await client.query(createGalleryImageLinkQuery, createGalleryImageLinkValues);
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/gallery', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const imageId = req.params.id
    const galleryId = req.body.galleryId
    const sqlText = 'DELETE FROM gallery_image WHERE image_id=$1 AND gallery_id=$2';
    const sqlValues = [imageId, galleryId]

    pool.query(sqlText, sqlValues)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing DELETE image query', err);
            res.sendStatus(500);
        });
});

module.exports = router;