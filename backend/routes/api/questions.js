const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('GET: /api/questions')
})

module.exports = router