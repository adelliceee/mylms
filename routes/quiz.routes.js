const {Router} = require('express')
const Quiz = require('../models/Quiz')
const Question = require('../models/Question')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {

    const {quiz_name,questions} = req.body

    const quiz = new Quiz({
      quiz_name,questions, owner: req.user.userId
    })


    await quiz.save()

    res.status(201).json({ quiz })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const quizes = await Quiz.find({ owner: req.user.userId })
    res.json(quizes)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
    res.json(quiz)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})

module.exports = router
