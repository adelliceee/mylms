const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Invalid email address').isEmail(),
    check('password', 'The minimum password length is 6 characters')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect data during registration'
      })
    }

    const {email, password, role} = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'This user already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword , role})

    await user.save()

    res.status(201).json({ message: 'User created' })

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter the correct email address').normalizeEmail().isEmail(),
    check('password', 'Enter your password').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid login information'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({email})


    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password, please try again' })
    }

    const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '2h' }
    )
    const role = user.role
    res.json({ token, userId: user.id , userRole:role})

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})


module.exports = router
