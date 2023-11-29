const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');



router.get('/:className/:classId', rejectUnauthenticated, (req, res) => {
    const className = req.params.className;
    const classId = req.params.classId;

    const sqlQuery = `SELECT (gallery.id), gallery.name, image.url, classroom.class_name
    FROM gallery 
    JOIN class_gallery ON gallery.id = class_gallery.gallery_id
    JOIN classroom ON classroom.id = class_gallery.class_id
    LEFT JOIN gallery_image ON gallery.id = gallery_image.gallery_id
    LEFT JOIN image ON image.id = gallery_image.image_id
    WHERE classroom.id = ($1)
    ORDER BY gallery.id DESC;`;
    const sqlValues = [classId]
    pool.query(sqlQuery, sqlValues)
    .then( result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: Get class galleries', err);
        res.sendStatus(500)
    })
})


router.post('/', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();

    try{
        const galleryName = req.body.galleryName;
        const classId = req.body.classId;

        await client.query('BEGIN')
        const sqlQuery = `
            INSERT INTO gallery ("name") 
            VALUES ($1)
            RETURNING id;`;
        const sqlValues = [galleryName];
        const newGalleryPostResults = await client.query (sqlQuery, sqlValues);
        const newGalleryId = newGalleryPostResults.rows[0].id;

        const createClassGalleryLinkQuery = `
            INSERT INTO class_gallery ("class_id", "gallery_id")
            VALUES ($1, $2);`;
        const createClassGalleryLinkValues = [classId, newGalleryId];
        await client.query(createClassGalleryLinkQuery, createClassGalleryLinkValues);
        
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('ERROR: Create new gallery', error);
        res.sendStatus(500);
    } finally {
        client.release()
    } 
});


router.delete('/:id', rejectUnauthenticated, (req,res) => {
    const galleryId = req.params.id;
    const sqlQuery = 'DELETE FROM gallery WHERE id=$1;';
    const sqlValues = [galleryId];
    pool.query (sqlQuery, sqlValues)
    .then((result) => {console.log(result); res.sendStatus(200) })
    .catch((err) => {
        console.log('ERROR: Delete gallery', err);
        res.sendStatus(500);})

})

module.exports = router;