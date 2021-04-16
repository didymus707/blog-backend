const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('Hola todo el mundo');
})

module.exports = router;