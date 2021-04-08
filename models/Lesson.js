const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  linkVideo: {type: String, required: true},
  date: {type: Date, default: Date.now},
  clicks: {type: Number, default: 0},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Lesson', schema)
