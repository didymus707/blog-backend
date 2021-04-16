const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.get('/api/get/allpostcomments', (req, res, next) => {
  const post_id = String(req.query.post_id);
  pool.query("SELECT * FROM comments WHERE post_id=$1", [post_id],
          (q_err, q_res) => {
            res.json(q_res.rows);
            console.log(q_err);
          }
        )
});

router.post('/api/post/commenttodb', (req, res, next) => {
  const values = [req.body.comment, req.body.user_id, req.body.username, req.body.post_id];
  pool.query(
    `INSERT INTO comments(comment, body, user_id, author, date_created)
      VALUES($1, $2, $3, $4, NOW())`,
      values,
      (q_err, q_res) => {
        if(q_err) return next(q_err);
        res.json(q_res)
        console.log(q_err);
      }
    )
});

router.put('/api/put/post', (req, res, next) => {
  const values = [req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid];
  pool.query(
    `UPDATE comments SET comment=$1, user_id=$2, post_id=$3, author=$4, date_created=NOW()
      WHERE cid = $4`,
      values,
      (q_err, q_res) => {
        q_res.rows;
        console.log(q_err);
      }
  )
})

router.delete('/api/delete/comment', (req, res, next) => {
  const cid = req.body.cid;
  pool.query(
    `DELETE FROM comments WHERE cid = $1`, [cid],
    (q_err, q_res) => {
      res.json(q_res.rows);
      console.log(q_err);
    }
  )
});

module.exports = router;