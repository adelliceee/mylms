const {Router} = require('express')
const Lesson = require('../models/Lesson')
const auth = require('../middleware/auth.middleware')
const router = Router()
const multer = require("multer")
let randomname =  Date.now() + "--"

const fileStorageEngine = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "./attachments"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    console.log(req.body)
    cb(null, file.originalname);
  },
});


const upload = multer({ storage: fileStorageEngine });
router.post("/single", upload.single("attachment"), (req, res) => {

  res.send("Single FIle upload success");
});

// Multiple Files Route Handler
router.post("/multiple", upload.array("attachments", 3), (req, res) => {
  console.log(req.files);
  res.send("Multiple Files Upload Success");
});



router.post('/generate', auth, async (req, res) => {
  try {

    const {title,description,files} = req.body



    res.status(201).json({ lesson })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post("/upload",auth, async (req, res, next) => {

  let filedata = req.file;
  console.log(filedata);
  if(!filedata)
    res.status(201).json({ filedata })
  else
    res.send("Файл загружен");
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
