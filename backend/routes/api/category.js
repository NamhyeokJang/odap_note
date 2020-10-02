const router = require('express').Router()
const { Category, Question, Log, sequelize } = require('../../models')

router.get('/today', async (req, res) => {
  const category = {
    title: '오늘의 학습',
    questions: await Question.findAll({
      where: {
        excluded: false
      },
      limit: 20,
      order: sequelize.random()
    })
  }

  res.json({ result: 'ok', category: category })
})

router.get('/weak', async (req, res) => {
  const category = {
    title: '약점 공략',
    questions: [{ id: 'weak', question: '미구현..', answer: '' }]
  }

  res.json({ result: 'ok', category: category })
})



/* Get Category include Questions By Id */
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const order = req.query.order === 'random' ? sequelize.random() : null
  const edit = req.query.edit ? null : { excluded: false }

  try {
    const category = await Category.findOne({
      where: {
        id
      },
      include: {
        model: Question,
        where: edit,
        attributes: {
          exclude: ['categoryId']
        },
        include: {
          model: Log,
          attributes: ['type'],
        }
      },
      order: order
    })

    res.json({ result: 'ok', category: category })
  } catch (error) {
    res.json({ result: 'error', error })
  }
})

/* Create Category */
router.post('/', async (req, res) => {
  const { title } = req.body

  try {
    const category = await Category.create({
      title: title,
    })

    res.json({ result: 'ok', category: category })
  } catch (error) {
    res.json({ result: 'error', message: '카테고리는 중복될 수 없습니다.' })
  }
})

/* Create Question By CategoryId */
router.post('/:id', async (req, res) => {
  const { id } = req.params
  const { questions } = req.body

  const questionsRes = []

  for (let i = 0; i < questions.length; i++) {
    const addQ = await Question.create({
      question: questions[i][0],
      answer: questions[i][1],
      categoryId: id
    })
    questionsRes.push(addQ)
  }

  res.json({ result: 'ok', questions: questionsRes })

})

/* Modify Category */
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const body = req.body

  try {
    await Category.update(body, {
      where: {
        id
      }
    })

    res.json({ result: 'ok' })
  } catch (error) {
    res.json({ result: 'error', error: error })
  }
})

/* Delete Category */
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Category.destroy({
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