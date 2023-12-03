class Question{
    constructor(questionobj){
        this.text = questionobj.questionText;
        this.choices = questionobj.options;
        this.answer = questionobj.answer;
    }

    isCorrectAnswer(choice){
        console.log(this.answer,choice);
        return this.answer === choice;
    }
}

export default Question;