const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    questionText: String,
    answerOptions: {
        answerText:String,
        isCorrect:Boolean
    }
})

module.exports = model('Question', schema)
