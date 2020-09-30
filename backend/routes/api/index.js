const router = require('express').Router()

/* Routers */
router.use('/categories', require('./categories'))
router.use('/category', require('./category'))
router.use('/questions', require('./questions'))
router.use('/question', require('./question'))
router.use('/logs', require('./logs'))
router.use('/log', require('./log'))
/* Test */
router.use('/test', require('./test'))

router.get('/', (req, res) => {
  res.send('GET: /api')
})

module.exports = router