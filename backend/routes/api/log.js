const router = require('express').Router()
const { Log } = require('../../models')

/* Create Log */
router.post('/', async (req, res) => {
  const { type, questionId } = req.body

  try {
    await Log.create({
      type: type,
      questionId: questionId
    })

    res.json({ result: 'ok' })
  } catch (error) {
    res.json({ result: 'error', error: error })
  }
})


module.exports = router