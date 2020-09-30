const router = require('express').Router()
const { Category, Question, sequelize } = require('../../models')

/* Get All Categories */
router.get('/', async (req, res) => {

  try {
    const categories = await Category.findAll({
      attributes: {
        include: [[sequelize.fn('count', sequelize.col('questions.id')), 'questionCount']]
      },
      include: {
        model: Question,
        attributes: [],
      },
      group: sequelize.col('category.id')
    })

    res.json({ result: 'ok', categories: categories })
  } catch (error) {
    res.json({ result: 'error', error: error })
  }
})

module.exports = router