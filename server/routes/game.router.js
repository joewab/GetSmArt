const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:userId/:galleryId', (req, res) => {
    const sqlQuery = `SELECT * FROM score WHERE user_id = $1 AND gallery_id = $2;`;
    const sqlValues = [req.params.userId, req.params.galleryId];
    pool.query(sqlQuery, sqlValues)
    .then((result) => { res.send(result.rows[0]); console.log('this is the get score result:', result.rows[0]); })
        .catch((err) => {
            console.log('Error completing SELECT score query', err);
            res.sendStatus(500);
        });
})

router.put('/:gameScore/:userId/:galleryId', (req, res) => {

    console.log('params in update score:', req.params);

    const gameScore = req.params.gameScore;
    const userId = req.params.userId;
    const galleryId = req.params.galleryId;
    const sqlQuery = `
    UPDATE score 
      SET 
        score = $1
      WHERE user_id = $2 AND gallery_id = $3;
  `;
    const sqlValues = [gameScore, userId, galleryId]
    pool.query(sqlQuery, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('Update score failed: ', err);
            res.sendStatus(500);
        });
})

router.post('/:gameScore/:userId/:galleryId', (req, res) => {

    console.log('params in post new score:', req.params);

    const gameScore = req.params.gameScore;
    const userId = req.params.userId;
    const galleryId = req.params.galleryId;
    const sqlQuery = 
    `INSERT INTO score (score, user_id, gallery_id)
    VALUES ($1, $2, $3);`;
    const sqlValues = [gameScore, userId, galleryId]
    pool.query(sqlQuery, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('post new score failed: ', err);
            res.sendStatus(500);
        });
})





module.exports = router;