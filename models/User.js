const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: Number},
  lessons: [{ type: Types.ObjectId, ref: 'Lesson'}]
})

module.exports = model('User', schema)
