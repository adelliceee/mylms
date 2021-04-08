const {Router} = require('express')
const Lesson = require('../models/Lesson')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {

    const {title,description,linkVideo} = req.body

    const lesson = new Lesson({
      title,description,linkVideo, owner: req.user.userId
    })


    await lesson.save()

    res.status(201).json({ lesson })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find({ owner: req.user.userId })
    res.json(lessons)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
    res.json(lesson)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
