const {Router} = require('express')
const Quiz = require('../models/Quiz')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const {questions} = req.body

    const quiz_name = questions[0].questionText

    const quiz = new Quiz({
      quiz_name,
      questions,
      owner: req.user.userId,
    })

    console.log(quiz)
    await quiz.save()

    res.status(201).json({ quiz })
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const quizes = await Quiz.find({ owner: req.user.userId })
    res.json(quizes)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
    res.json(quiz)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

module.exports = router
