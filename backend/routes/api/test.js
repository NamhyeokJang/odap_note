const router = require('express').Router()
const { Category, Question, sequelize } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const questions = await Question.findAll({
      attributes: ['categoryId', [sequelize.fn('count', sequelize.col('categoryId')), 'cnt']],
      group: sequelize.col('categoryId')
    })

    res.json({ questions })
  } catch (error) {
    res.json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const category = await Category.findAll({
      attributes: {
        include: [[sequelize.fn('count', sequelize.col('questions.id')), 'cnt']]
      },
      include: {
        model: Question,
        attributes: [],
      },
      group: sequelize.col('category.id')
    })

    res.json({ category })
  } catch (error) {
    res.json({ error })
  }
})

module.exports = router