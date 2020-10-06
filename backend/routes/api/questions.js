const router = require('express').Router()
const { Question, sequelize, Log, Sequelize } = require('../../models')

router.get('/', async (req, res) => {
  const LIMIT = 10
  const { page = 1, excluded, important } = req.query
  const where = {}

  /* excluded */
  if (excluded) {
    if (excluded === 'true') {
      where.excluded = true
    }
  }

  /* important */
  if (important) {
    if (important === 'true') {
      where.important = true
    }
  }

  const questions = await Question.findAll({
    where: {
      ...where,
    },
    limit: LIMIT,
    offset: LIMIT * (page - 1),
    attributes: {
      exclude: ['categoryId'],
    },
    include: {
      model: Log,
    }
  })
  res.json({ result: 'ok', questions: questions })
})

router.get('/fail', async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: {
        excluded: false
      },
      include: {
        model: Log,
        where: {
          type: 'fail'
        }
      },
      order: sequelize.random()
    })

    res.json({ questions: questions })
  } catch (error) {
    res.json({ result: 'ok', questions: questions })
  }
})

module.exports = router