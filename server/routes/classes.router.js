const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

//  router.get('/:userId', rejectUnauthenticated, (req, res) => {
//     const sqlQuery = `SELECT classroom.id, classroom.class_name
//     FROM classroom
//     JOIN user_class ON classroom.id = user_class.class_id
//     JOIN "user" ON "user".id = user_class.user_id
//     WHERE "user".id = $1
//     ORDER BY classroom.id DESC;`;

//     const sqlValues = [req.params.userId];
//     pool.query(sqlQuery, sqlValues)
//     .then( result => {
//         res.send(result.rows);
//     })
//     .catch(err => {
//         console.log('ERROR: Get all Classes', err);
//         res.sendStatus(500)
//     })
// });

// The above method will retrieve classes based on user id
// I altered it below to get all classes regardless of user, could be permenent but not sure yet

router.get('/:userId', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `SELECT *
    FROM classroom
    ORDER BY classroom.id DESC;`;
    pool.query(sqlQuery)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: Get all Classes', err);
        res.sendStatus(500)
    })
});

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
        console.log('ERROR: Create new class', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

router.delete('/', rejectUnauthenticated, (req,res) => {
    const classId = req.body.classId;
    const sqlQuery = 'DELETE FROM classroom WHERE id=$1;';
    const sqlValues = [classId];
    pool.query (sqlQuery, sqlValues)
    .then((result) => {console.log(result); res.sendStatus(200) })
    .catch((err) => {
        console.log('ERROR: Delete class', err);
        res.sendStatus(500);})

})

module.exports = router;
