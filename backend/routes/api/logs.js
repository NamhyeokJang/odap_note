const router = require('express').Router()
const { Question, Log, sequelize } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const logs = await Log.findAndCountAll({
      attributes: {
        exclude: ['questionId', 'updatedAt']
      },
      include: {
        model: Question,
      },
      order: [['createdAt', 'DESC']]
    })

    res.json({ result: 'ok', count: logs.count, logs: logs.rows })
  } catch (error) {
    res.json({ result: 'error', error: error })
  }
})

// router.get('/', async (req, res) => {

//   try {
//     const logs = await Log.findAll({
//       where: {
//         type: 'fail'
//       },
//       attributes: [[sequelize.fn('count', sequelize.col('questionId')), 'cnt']],
//       group: sequelize.col('questionId'),
//       include: {
//         model: Question
//       }
//     })

//     res.json({ result: 'ok', logs: logs })

//   } catch (error) {
//     res.json({ error: error })
//   }
// })


module.exports = router