const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    quiz_name: {type: String, required: true, unique: true},
    questions: [{ type: Types.ObjectId, ref: 'Question'}],
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Quiz', schema)
