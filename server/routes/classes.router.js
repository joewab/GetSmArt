const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
/**
 * GET route template
 */
 router.get('/:userId', rejectUnauthenticated, (req, res) => {

    console.log('params from get all classes:', req.params);

    const sqlQuery = `SELECT classroom.id, classroom.class_name
    FROM classroom
    JOIN user_class ON classroom.id = user_class.class_id
    JOIN "user" ON "user".id = user_class.user_id
    WHERE "user".id = $1
    ORDER BY classroom.id DESC;`;

    const sqlValues = [req.params.userId];
    pool.query(sqlQuery, sqlValues)
    .then( result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: Get all Classes', err);
        res.sendStatus(500)
    })
});

// router.post('/', rejectUnauthenticated, (req, res) => {
//     const className = req.body.className;
//     const sqlQuery = `INSERT INTO classroom ("class_name") VALUES ($1);`;
//     const sqlValues = [className];
//     pool.query (sqlQuery, sqlValues)
//     .then((result) => { console.log(result); res.sendStatus(200) })
//     .catch((err) => {
//       console.log('Error in POST className', err);
//       res.sendStatus(500);})
// });

router.post('/', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();

    try {
        const className = req.body.className;
        const userId = req.body.userId;
        await client.query('BEGIN')
        const sqlQuery = `
            INSERT INTO "classroom" ("class_name")
            VALUES ($1)
            RETURNING id;`;
        const sqlValues = [ className ]
        const newClassResults = await client.query(sqlQuery, sqlValues);
        const newClassId = newClassResults.rows[0].id;

        const createUserClassLinkQuery = `INSERT INTO "user_class" ("user_id", "class_id") VALUES ($1, $2)`;
        const createUserClassLinkValues = [userId, newClassId];
        await client.query(createUserClassLinkQuery, createUserClassLinkValues);

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/classes', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

module.exports = router;
