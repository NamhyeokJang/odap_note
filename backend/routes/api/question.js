const router = require('express').Router()
const { Question } = require('../../models')

router.get('/', (req, res) => {
  res.send('GET: /api/question')
})

/* Modify Question */
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const body = req.body

  try {
    await Question.update(body, {
      where: {
        id
      }
    })

    res.json({ result: 'ok' })
  } catch (error) {
    res.json({ result: 'error', error: error })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Question.destroy({
      where: {
        id
      }
    })
    res.json({ result: 'ok' })
  } catch (error) {
    res.json({ result: 'error', error: error })
  }
})

module.exports = router