const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    quiz_name: {type: String, required: true, unique: true},
    questions: [{ type: Array, required: true}],
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Quiz', schema)
