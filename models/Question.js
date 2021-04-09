const {Schema, model, Types} = require('mongoose')



const schema = new Schema({
    constructor(questionText,answerOptions) {
        this.questionText = questionText;
        this.answerOptions = [answerOptions];
    }
})

module.exports = model('Question', schema)
