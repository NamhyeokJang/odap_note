const router = require('express').Router()
const { Log, sequelize, Question } = require('../../models')

router.get('/', async (req, res) => {

  try {
    const logs = await Log.findAll({
      where: {
        type: 'fail'
      },
      attributes: [[sequelize.fn('count', sequelize.col('questionId')), 'cnt']],
      group: sequelize.col('questionId'),
      include: {
        model: Question
      }
    })

    res.json({ result: 'ok', logs: logs })

  } catch (error) {
    res.json({ error: error })
  }
})


module.exports = router