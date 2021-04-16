const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.post('/api/post/usertodb', (req, res, next) => {
  const values = [req.body.profile.nickname, req.body.user_id, req.body.email, req.body.profile.email_verified];
  pool.query(
    `INSERT INTO users(username, email, email_verified, date_created)
      VALUES($1, $2, $3, NOW()) ON CONFLICT DO NOTHING`,
      values,
      (q_err, q_res) => {
        if(q_err) return next(q_err);
        res.json(q_res)
        console.log(q_err);
      }
    )
});

router.get('/api/get/usertodb', (req, res, next) => {
  const email = String(req.body.email);
  pool.query(
    `SELECT * FROM users WHERE email=$1`, [email],
      (q_err, q_res) => {
        if(q_err) return next(q_err);
        res.json(q_res)
        console.log(q_err);
      }
    )
});

router.get('/api/get/userposts', (req, res, next) => {
  const user_id = String(req.body.userid);
  pool.query(
    `SELECT * FROM posts WHERE user_id=$1`, [user_id],
      (q_err, q_res) => {
        if(q_err) return next(q_err);
        res.json(q_res)
        console.log(q_err);
      }
    )
});

module.exports = router;